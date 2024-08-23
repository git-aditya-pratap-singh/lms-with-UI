import { NextFunction, Request, Response} from 'express';
import {ObjectId} from 'mongodb';
import mongoose,{ PipelineStage } from 'mongoose';
import AlertService from '../../../helpers/AlertService';
import asyncHandler from '../../../utils/asyncHandler';
import CommonServices from '../../../helpers/common.services';
import Password_Encrypt_Decrypt from '../../../helpers/PswdEncrypt';
import EmailSetupService from "../../../mail/emailSetup.services";

import teachersDB from '../../../models/teachers.schema'; 

const INSTANCE_OF_PSWD = new Password_Encrypt_Decrypt();
const INSTANCE_OF_MAIL = new EmailSetupService();

class TeachersControllers extends AlertService {

    public getTeachersDeatils = asyncHandler( async(req: Request, res: Response): Promise<any>=>{
        const teacherList: PipelineStage[]  = [
            {
                '$lookup': {
                    'from': 'courses', 'localField': 'course', 'foreignField': '_id', 'as': 'courseList', 
                    'pipeline': [
                      {
                        '$match': {'status': {'$ne': 'Disabled'}}
                      }
                    ]
                  }
            }, 
            {
                '$addFields': {
                    'courseList': {
                      '$map': {
                        'input': '$courseList', 'as': 'courseItem', 
                        'in': { '_id': '$$courseItem._id', 'label': '$$courseItem.name'}
                      }
                    }
                }
            }, 
            {
                '$lookup': {
                    'from': 'courses', 'localField': '_id', 'foreignField': 'faculty', 'as': 'faculityCourse'
                }
            }, 
            {
                '$addFields': {
                    'faculityCourse': {
                      '$map': {
                        'input': '$faculityCourse', 'as': 'faculityCourse', 
                        'in': {'_id': '$$faculityCourse._id', 'label': '$$faculityCourse.name'}
                      }
                    }
                  }
            }, 
            {
                '$project': {
                    '_id': 1, 'name': 1, 'email': 1, 'phone': 1, 'gender': 1, 
                    'status': 1, 'address': 1, 'imgUrl': 1, 'courseList': 1, 
                    'faculityCourse': 1
                }
            },{'$sort': {'name': 1}}
        ];

        let response = await teachersDB.aggregate(teacherList);
        //--------------- Teacher collection and course collection merge and findout courseList-----------------------
        const faculityCourseIds = new Set(response.flatMap(item => item.faculityCourse.map((course: any) => course._id)));
        response.forEach(item => {
            item.faculityCourse.forEach((courseItem: any) => {
                if (!item.courseList.some((course: any) => course._id === courseItem._id)) {
                    item.courseList.push(courseItem);
                }
            });
        });
        //------------------------------------------------------------------------------------------------------------
        return this.sendSuccessResponse(res, true, "Fetch-Succefully!!", response);
    });

    public getCourseTeachersDeatils = asyncHandler( async(req: Request, res: Response): Promise<any>=>{
        const response = await teachersDB.find({},{
            _id: 1,
            name: 1,
        })
        return this.sendSuccessResponse(res, true, "Fetch-Succefully!!", response);
    })

    public addTeachers = asyncHandler( async(req: Request, res: Response, next: NextFunction, session?: mongoose.ClientSession): Promise<any> =>{
      
        const {name, email, phone, course, gender, status, address, imgUrl} = req.body; 
        const courseList: ObjectId[] = course.map((courseItem: any) => new ObjectId(courseItem.value));

        const credential: any = await this.credentialCheck(email, phone, res);
        if(credential)
            return this.sendErrorResponse(res, false, "This User is already exists!!")

        const userName: string = await new CommonServices().createUserName(name, res);
        const validUsername: string = await this.credentialUsernameCheck(userName, res)
        if(validUsername)
            return this.sendErrorResponse(res, false, "This Username is already exists!!")

        const generatePswd: any = await this.generatePassword(name, res);
        if(!generatePswd)
            return this.sendErrorResponse(res, false, "Password isn't to be generated!!")

        const emailSent = await INSTANCE_OF_MAIL.sendCredentialsByEmailOfTeachers(res, name, userName, generatePswd.pswd, email);
        if(!emailSent)
            return this.sendErrorResponse(res, false, "Failed to Send Credential on your email !!")
        
        const newTeachers = new teachersDB({
           username: userName,
           name: name,
           password: generatePswd.encyPswd,
           email: email,
           phone: phone,
           gender: gender,
           course: courseList,     
           status: status,
           address: address,
           imgUrl: imgUrl ? imgUrl : '',
           admin_logs: req?.user?.username
        });
        await newTeachers.save({session})
        .then(saveData =>{
            return this.sendSuccessResponse(res, true, "Credentials Added Successfully!!");
        })
        .catch(err =>{
            return this.sendErrorResponse(res, false, "Credentials hasn't Added!!");
        })
    });

    public editTeachers = asyncHandler( async(req: Request, res: Response, next: NextFunction, session?: mongoose.ClientSession): Promise<any>=>{
        
        const {name, email, phone, course, gender, status, address, imgUrl} = req.body;
        const courseList: ObjectId[] = course.map((courseItem: any) => new ObjectId(courseItem.value));
        
        const updateTeacherData = await teachersDB.updateOne(
            {email: email},
            {$set: {
                name: name,
                email: email,
                phone: phone,
                course: courseList,
                gender: gender,  
                status: status,
                address: address,
                imgUrl: imgUrl,
                admin_logs: req?.user?.username
            }},
            {new: true, session}
        );
        return updateTeacherData
            ? this.sendSuccessResponse(res, true, `Student Credential Updated!!`)
            : this.sendErrorResponse(res, false, `Failed to update student Credential !!`);   
    });

    private credentialCheck = async(email: string, phone: string, res: Response): Promise<any> =>{
        try{
           const response = await teachersDB.findOne({
            $or: [
                {email: email},
                {phone: phone}
            ]
           })
           return response;
        }catch(err){
            return this.sendServerErrorResponse(res, false, `SERVER_ERROR!!${err}`);
        }
    };

    private credentialUsernameCheck = async(userName: string, res: Response): Promise<any> =>{
        try{
            const response = await teachersDB.findOne({
                username: userName
            })
           return response;
        }catch(err){
            return this.sendServerErrorResponse(res, false, `SERVER_ERROR!!${err}`);
        }
    };

    // private isCheckTeacherStatus = async(email: string, res: Response): Promise<boolean | any> =>{
    //     try{
    //         const hasStatus = await teachersDB.findOne({
    //             email: email,
    //             status: { $ne: "Disabled" }
    //         });
    //         return hasStatus ? true : false;
    //     }catch(err){
    //         return this.sendServerErrorResponse(res, false, `SERVER_ERROR!!${err}`);
    //     }
    // };

    private generatePassword = async(name: string, res: Response): Promise<any>=>{
        try{ 
            const pswd = name.toLowerCase().split(" ")[0] + '@' + Math.floor(Math.random() * 1000);
            const encyPswd = await INSTANCE_OF_PSWD.passwordEncrypt(pswd);
            return {encyPswd, pswd}
        }catch(err){
            return this.sendServerErrorResponse(res, false, `SERVER_ERROR!!${err}`);
        }
    };

}
export default TeachersControllers;