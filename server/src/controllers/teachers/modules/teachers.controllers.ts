import {Request, Response} from 'express';
import {ObjectId} from 'mongodb';
import { PipelineStage } from 'mongoose';
import AlertService from '../../../helpers/AlertService';
import asyncHandler from '../../../utils/asyncHandler';
import CommonServices from '../../../helpers/common.services';
import Password_Encrypt_Decrypt from '../../../helpers/PswdEncrypt';
import NewMailFunctions from "../../../mail/mail.controllers";

import teachersDB from '../../../models/teachers.schema'; 

const INSTANCE_OF_PSWD = new Password_Encrypt_Decrypt();
const INSTANCE_OF_MAIL = new NewMailFunctions();

class TeachersControllers extends AlertService {

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
    }

    private credentialUsernameCheck = async(userName: string, res: Response): Promise<any> =>{
        try{
            const response = await teachersDB.findOne({
                username: userName
            })
           return response;
        }catch(err){
            return this.sendServerErrorResponse(res, false, `SERVER_ERROR!!${err}`);
        }
    }

    private generatePassword = async(name: string, res: Response): Promise<any>=>{
        try{ 
            const pswd = name.toLowerCase().split(" ")[0] + '@' + Math.floor(Math.random() * 1000);
            const encyPswd = await INSTANCE_OF_PSWD.passwordEncrypt(pswd);
            return {encyPswd, pswd}
        }catch(err){
            return this.sendServerErrorResponse(res, false, `SERVER_ERROR!!${err}`);
        }
    }

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
        //--------------- Teacher collection and course collection merge and findout courseList------------------------
        await Promise.all(response.map(async(item: any) => {
            await item.faculityCourse.filter((courseItem: any) => {
                item.courseList.some((course: any) => {
                    (course._id === courseItem._id) ? null : item.courseList.push(courseItem);
                });
            });
        }));
        //------------------------------------------------------------------------------------------------------------
        return this.sendSuccessResponse(res, true, "Fetch-Succefully!!", response);
    })

    public getCourseTeachersDeatils = asyncHandler( async(req: Request, res: Response): Promise<any>=>{
        const response = await teachersDB.find({},{
            _id: 1,
            name: 1,
        })
        return this.sendSuccessResponse(res, true, "Fetch-Succefully!!", response);
    })

    public addTeachers = asyncHandler( async(req: Request, res: Response): Promise<any> =>{
      
        const {name, email, phone, course, gender, status, address, imgUrl} = req.body;
        const courseList: ObjectId[] = course.map((courseItem: any) => new ObjectId(courseItem.value));
        const credential: any = await this.credentialCheck(email, phone, res);
        if(credential){
            return this.sendErrorResponse(res, false, "This User is already exists!!")
        }
        const userName: string = await new CommonServices().createUserName(name, res);
        const validUsername: string = await this.credentialUsernameCheck(userName, res)
        if(validUsername){
            return this.sendErrorResponse(res, false, "This Username is already exists!!")
        }
        const generatePswd: any = await this.generatePassword(name, res);
        if(!generatePswd){
            return this.sendErrorResponse(res, false, "Password isn't to be generated!!")
        }
        const toEmail = email;
        const subject: string = '🪬Your Account Credential from elearn SoftTech Pvt. Ltd';
        const messagehtml = `
            <p>Dear ${name},</p>
            <p>Your account has been created successfully. Below are your login Credential:</p>
            <p><strong>Username:</strong> <span style="color: #007DFC">${userName}</span></p>
            <p><strong>Password:</strong> <span style="color: #007DFC">${generatePswd.pswd}</span></p>
            <p>Please keep this information safe and secure.</p><br><br>
            <p style="color: #007DFC">Best regards,</p>
            <p style="color: #007DFC">elearn SoftTech Pvt. Ltd</p>
            <p style="color: #007DFC">Address: WMGV+P43, Varthur Main Rd, Devarabisanahalli, Uttarahalli Hobli, Bengaluru, Karnataka 560103</p>`

        const sent = await INSTANCE_OF_MAIL.newSmtpMail(toEmail, subject, messagehtml)
        if(!sent){
            return this.sendErrorResponse(res, false, "Failed to Send Credential on your email !!")
        }
        const response = await new teachersDB({
           username: userName,
           name: name,
           password: generatePswd.encyPswd,
           email: email,
           phone: phone,
           gender: gender,
           course: courseList,     
           status: status,
           address: address,
           imgUrl: imgUrl,
           admin_logs: req?.user?.username
        });
        response.save()
        .then(saveData =>{
            return this.sendSuccessResponse(res, true, "Credentials Added Successfully!!");
        })
        .catch(err =>{
            return this.sendErrorResponse(res, false, "Credentials hasn't Added!!");
        })
    });

    public editTeachers = asyncHandler( async(req: Request, res: Response): Promise<any>=>{
        console.log(req.body)
        const {name, email, phone, course, gender, status, address, imgUrl} = req.body;
    })

}
export default TeachersControllers;