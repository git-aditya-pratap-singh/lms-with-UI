import { NextFunction, Request, Response } from "express";
import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';
import os from 'os';
import {ObjectId} from 'mongodb';
import mongoose, { PipelineStage } from 'mongoose';
import AlertService from '../../../helpers/AlertService';
import asyncHandler from '../../../utils/asyncHandler';
import CommonServices from '../../../helpers/common.services';
import StudentCommonFunc from "./students.commonFunc";
import Password_Encrypt_Decrypt from '../../../helpers/PswdEncrypt';
import EmailSetupService from "../../../mail/emailSetup.services"; 

import studentsDB from "../../../models/students.schema";

const INSTANCE_OF_PSWD = new Password_Encrypt_Decrypt();
const INSTANCE_OF_MAIL = new EmailSetupService();
class StudentsControllers extends AlertService {

    public getStudentsDeatils = asyncHandler( async(req: Request, res: Response): Promise<any>=>{
        const studentList: PipelineStage[] = [
            {
              '$lookup': {
                'from': 'courses', 'localField': 'course', 'foreignField': '_id', 
                'as': 'selectedCourseList', 
                'pipeline': [
                  {'$match': {'status': {'$ne': 'Disabled'}} }
                ]
              }
            }, {
              '$addFields': {
                'selectedCourseList': {
                  '$map': {
                    'input': '$selectedCourseList', 'as': 'selectedCourse', 
                    'in': {'_id': '$$selectedCourse._id', 'label': '$$selectedCourse.name'}
                  }
                }
              }
            },{'$sort': {'name': 1}}
        ];
        const response = await studentsDB.aggregate(studentList);
        return this.sendSuccessResponse(res, true, "Fetch-Succefully!!", response);
    });

    public addStudents = asyncHandler( async(req: Request, res: Response, next: NextFunction, session?: mongoose.ClientSession): Promise<any> =>{
      
        const {name, email, phone, course, gender, status, address, imgUrl} = req.body;
        const courseList: ObjectId[] = course.map((courseItem: any) => new ObjectId(courseItem.value));

        const credential: any = await new StudentCommonFunc().credentialCheck(email, phone, res);
        if(credential)
            return this.sendErrorResponse(res, false, "This User is already exists!!")

        const userName: string = await new CommonServices().createUserName(name, res);
        const validUsername: string = await this.credentialUsernameCheck(userName, res)
        if(validUsername)
            return this.sendErrorResponse(res, false, "This Username is already exists!!")

        const generatePswd: any = await this.generatePassword(name, res);
        if(!generatePswd)
            return this.sendErrorResponse(res, false, "Password isn't to be generated!!")
        
        const emailSent = await INSTANCE_OF_MAIL.sendCredentialsByEmailOfStudents(res, name, userName, generatePswd.pswd, email);
        if(!emailSent)
            return this.sendErrorResponse(res, false, "Failed to Send Credential on your email !!")

        const newStudent = new studentsDB({
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

        await newStudent.save({ session })
        .then(saveData =>{
            return this.sendSuccessResponse(res, true, "Credentials Added Successfully!!");
        })
        .catch(err =>{
            return this.sendErrorResponse(res, false, "Credentials hasn't Added!!");
        })
    });

    public editStudents = asyncHandler( async(req: Request, res: Response, next: NextFunction, session?: mongoose.ClientSession): Promise<any>=>{

        const {name, email, phone, course, gender, status, address, imgUrl} = req.body;
        // const credential: any = await this.credentialCheck(email, phone, res);
        // if(credential){
        //     return this.sendErrorResponse(res, false, "This Email or Phoneno. is already exists!!")
        // }
        if(req?.user?.designation !== 'admin'){
            const hasStudentStatus: boolean = await this.isCheckStudentStatus(email, res);
            if(!hasStudentStatus)
                return this.sendErrorResponse(res, false, "Account has been Deactivate. Please, Contact to Administrator!!")
        }
        
        const courseList: ObjectId[] = course.map((courseItem: any) => new ObjectId(courseItem.value));
        const updateStudentData = await studentsDB.updateOne(
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
        return updateStudentData
            ? this.sendSuccessResponse(res, true, `Student Credential Updated!!`)
            : this.sendErrorResponse(res, false, `Failed to update student Credential !!`);
    });

    public downloadExcelSheet = asyncHandler( async(req: Request, res: Response): Promise<any>=>{
        const fetchStudentsInfo = await studentsDB.find();
        const getDownloadsFolder = () => path.join(os.homedir(), 'Downloads');
        console.log(getDownloadsFolder())
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');
      
        // Define columns
        worksheet.columns = [
          { header: 'Name', key: 'name', width: 20 },
          { header: 'Age', key: 'age', width: 10 },
          { header: 'Occupation', key: 'occupation', width: 30 },
        ];
      
        // Add rows
        worksheet.addRows(fetchStudentsInfo);
      
        // Style the header row: Set background color and font
        worksheet.getRow(1).eachCell((cell) => {
          cell.font = { bold: true, color: { argb: 'FFFFFFFF' } }; // White text
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF0000FF' }, // Blue background
          };
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
        });
      
        // Merge columns A1 and B1 (or any range you want to merge)
        worksheet.mergeCells('A1:B1');
      
        // Apply background color to a specific column (e.g., Column C)
        worksheet.getColumn('C').eachCell({ includeEmpty: true }, (cell) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFF00FF' }, // Yellow background for column C
          };
        });
      
        // Save the Excel file to the Downloads folder
        const downloadsFolder = getDownloadsFolder();
        const filePath = path.join(__dirname, '../../../upload', 'styled_data.xlsx');
        
        // Write the workbook to the file
        await workbook.xlsx.writeFile(filePath);
      
        return this.sendSuccessResponse(res, true, "Credentials Added Successfully!!");

    });

    // credentialCheck = async(email: string, phone: string, res: Response): Promise<any> =>{
    //     try{
    //        const response = await studentsDB.findOne({
    //         $or: [
    //             {email: email},
    //             {phone: phone}
    //         ]
    //        })
    //        return response;
    //     }catch(err){
    //         return this.sendServerErrorResponse(res, false, `SERVER_ERROR!!${err}`);
    //     }
    // };

    private credentialUsernameCheck = async(userName: string, res: Response): Promise<any> =>{
        try{
            const response = await studentsDB.findOne({
                username: userName
            })
           return response;
        }catch(err){
            return this.sendServerErrorResponse(res, false, `SERVER_ERROR!!${err}`);
        }
    };

    private isCheckStudentStatus = async(email: string, res: Response): Promise<boolean | any> =>{
        try{
            const hasStatus = await studentsDB.findOne({
                email: email,
                status: { $ne: "Disabled" }
            });
            return hasStatus ? true : false;
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
    };
}
export default StudentsControllers;