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
            ? this.sendSuccessResponse(res, true, `Student Credential Updated !!`)
            : this.sendErrorResponse(res, false, `Failed to update student Credential !!`);
    });

    public downloadExcelSheet = asyncHandler( async(req: Request, res: Response): Promise<any>=>{
        const fetchStudentsInfo = await studentsDB.find();

        const getDownloadsFolder = () => path.join(os.homedir(), 'Documents');
        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'Aditya Pratap Singh';
        workbook.lastModifiedBy = "Aditya Singh";
        workbook.created = new Date();
        const worksheet = workbook.addWorksheet('Students',{properties: {tabColor: {argb: '0558FF'}}});

        // Define columns
        worksheet.columns = [
            { header: 'Username', key: 'username', width: 25},
            { header: 'Name', key: 'name', width: 25 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Phone', key: 'phone', width: 14, style:{ alignment : { vertical: 'middle', horizontal: 'center' } }},
            { header: 'Gender', key: 'gender', width: 8, style:{ alignment : { vertical: 'middle', horizontal: 'center' } }},
            { header: 'Status', key: 'status', width: 10, style:{ alignment : { vertical: 'middle', horizontal: 'center' } }},
            { header: 'Address', key: 'address', width: 30 },
            { header: 'Course', key: 'course', width: 30 }
        ];

        worksheet.mergeCells('A1:M1');
        const headerCell = worksheet.getCell('A1');
        headerCell.value = 'StudentDetails';

        const headerSecCellDate = worksheet.getCell('A2'); 
        headerSecCellDate.value = `Date: ${new Date().toISOString().split('T')[0]}`;

        const headerSecCellTime = worksheet.getCell('B2');
        headerSecCellTime.value = `Time: ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;

        const headerSecCellFilter = worksheet.getCell('C2');
        headerSecCellFilter.value = `Filter: All`;

        worksheet.mergeCells('D2:M2');

        // Freeze the first row (header row)
        worksheet.views = [
            { state: 'frozen', ySplit: 3 } // This freezes the first row
        ];

        // Styling for merged header cell
        headerCell.font = { size: 24, bold: true, color: { argb: 'FFFFFFFF' } }; // White text
        headerCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '404040' } }; // Blue background
        headerCell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

        // Styling for additional header cells
        [headerSecCellDate, headerSecCellTime, headerSecCellFilter].forEach(cell => {
            cell.font = { size: 10, bold: true, color: { argb: '262626' } }; // Black text
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'B7DEE8' } }; // Light blue background
            cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        });
        worksheet.getRow(1).height = 40;
    

        const row = worksheet.getRow(3);


        // worksheet.columns.map((items)=>{
        //     console.log("------>>>",items._keys)
        // })

        // Create A Header Column Name-------------
        const ColData = ['Username', 'Name', 'Email', 'Phone', 'Gender', 'Status', 'Address', 'Course'];
        ColData.map((item,index)=>{
            row.getCell(index+1).value = item
            //row.width = 20;
        })

        worksheet.getRow(3).eachCell((cell) => {
            cell.font = { bold: true, color: { argb: '404040' } }; // White text
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FCD5B4' }, // Blue background
            };
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
          });

        // Add rows
        worksheet.addRows(fetchStudentsInfo);
    
        //console.log(worksheet.lastRow)
 

        //Save the Excel file to the Downloads folder
        const downloadsFolder = getDownloadsFolder();
        const filePath = path.join(downloadsFolder, `StudentLists_${new Date().toISOString().split('T')[0]}.xlsx`);
    
        // Write the workbook to the file
        await workbook.xlsx.writeFile(filePath);
      
        return this.sendSuccessResponse(res, true, "ExcelSheet Downloaded !!");

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