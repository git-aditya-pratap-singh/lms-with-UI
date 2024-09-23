import { NextFunction, Request, Response} from 'express';
import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';
import os from 'os';
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
        const responseData = await this.getTeacherList(req, res);
        return this.sendSuccessResponse(res, true, "Fetch-Succefully!!", responseData);
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
            ? this.sendSuccessResponse(res, true, `Teachers Credential Updated!!`)
            : this.sendErrorResponse(res, false, `Failed to update teacher Credential !!`);   
    });

    public downloadExcelSheet = asyncHandler( async(req: Request, res: Response): Promise<any>=>{

        const fetchTeachersInfo = await teachersDB.find();
        const response = await this.getTeacherList(req, res);
        
        const activeStatus =  fetchTeachersInfo.filter(items =>items.status.includes('Active'));
        const inactiveStatus =  fetchTeachersInfo.filter(items =>items.status.includes('Inactive'));
        const totalNo_ofTeachers = fetchTeachersInfo.length;
        const totalActiveTeachers = activeStatus.length;
        const totalInactiveTeachers = inactiveStatus.length;
       

        const getDownloadsFolder = () => path.join(os.homedir(), 'Documents');
        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'Aditya Pratap Singh';
        workbook.lastModifiedBy = "Aditya Singh";
        workbook.created = new Date();
        const worksheet = workbook.addWorksheet('Teachers', {properties: {tabColor: {argb: '0558FF'}}});

        // Define columns
        worksheet.columns = [
            { header: 'Username', key: 'username', width: 25},
            { header: 'Name', key: 'name', width: 25 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Phone', key: 'phone', width: 14, style:{ alignment : { vertical: 'middle', horizontal: 'center' } }},
            { header: 'Gender', key: 'gender', width: 8, style:{ alignment : { vertical: 'middle', horizontal: 'center' } }},
            { header: 'Status', key: 'status', width: 10, style:{ alignment : { vertical: 'middle', horizontal: 'center' } }},
            { header: 'Address', key: 'address', width: 30 },
            { header: 'Course', key: 'courseList', width: 30 }
        ];

        worksheet.mergeCells('A1:H1');
        const headerCell = worksheet.getCell('A1');
        headerCell.value = 'TeacherDetails';

        const headerSecCellDate = worksheet.getCell('A2'); 
        headerSecCellDate.value = `Date: ${new Date().toISOString().split('T')[0]}`;

        const headerSecCellTime = worksheet.getCell('B2');
        headerSecCellTime.value = `Time: ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;

        const headerSecCellFilter = worksheet.getCell('C2');
        headerSecCellFilter.value = `Filter: All`;

        worksheet.mergeCells('D2:M2');
        worksheet.views = [
            { state: 'frozen', ySplit: 3 } // This freezes the first 3 row
        ];

        // Styling for merged header cell
        headerCell.font = { size: 24, bold: true, color: { argb: '002060' } }; 
        headerCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffc7ce' } }; 
        headerCell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

        // Styling for additional Date, Time, Filter cells
        [headerSecCellDate, headerSecCellTime, headerSecCellFilter].forEach(cell => {
            cell.font = { size: 10, bold: false, color: { argb: 'fa7d00' } }; 
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'f2f2f2' } }; 
            cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
            cell.border = {
                top: { style: 'thin', color: { argb: '7f7f7f' } },
                left: { style: 'thin', color: { argb: '7f7f7f' } },
                bottom: { style: 'thin', color: { argb: '7f7f7f' } },
                right: { style: 'thin', color: { argb: '7f7f7f' } },
            };
        });
        worksheet.getRow(1).height = 40;
    
        const row = worksheet.getRow(3);
        // Create A Header Column Name-------------
        const ColData = ['Username', 'Name', 'Email', 'Phone', 'Gender', 'Status', 'Address', 'Course'];
        ColData.map((item,index)=>{
            row.getCell(index+1).value = item
        })

        worksheet.getRow(3).eachCell((cell) => {
            cell.font = { bold: true, color: { argb: '006100' } }; 
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'c6efce' }, 
            };
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
          });

        //Add all rows data ---------------
        response.forEach((teacher: any) => {
            worksheet.addRow({
              username: teacher.username,
              name: teacher.name,
              email: teacher.email,
              phone: teacher.phone, 
              gender: teacher.gender,
              status: teacher.status,
              address: teacher.address,
              courseList: teacher.courseList.map((course: any) => 
                course.label.charAt(0).toUpperCase() + course.label.slice(1).toLowerCase()).join(', ')  // Add course labels
            });
        });

    
        let lastRowNumber = 0;
        worksheet.eachRow((row, rowNumber) => {
          lastRowNumber = rowNumber;
          return false;  // Breaks out of the loop once we find the last row
        });

        // Create Footer Cells ---------------------
        worksheet.mergeCells(`A ${lastRowNumber+1} : B ${lastRowNumber+1}`);
        const footerCelltotal = worksheet.getCell(`A ${lastRowNumber+1}`);
        footerCelltotal.value = `Total Teachers : ${totalNo_ofTeachers}`;
        footerCelltotal.font = { size: 10, bold: false, color: { argb: '002060' } };
        footerCelltotal.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'b6dde8' } }; 
        footerCelltotal.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

        worksheet.mergeCells(`C ${lastRowNumber+1} : D ${lastRowNumber+1}`);
        const footerCellActive = worksheet.getCell(`C ${lastRowNumber+1}`);
        footerCellActive.value = `Total No. Of Active Teachers : ${totalActiveTeachers}`;
        footerCellActive.font = { size: 10, bold: false, color: { argb: '002060' } };
        footerCellActive.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'b6dde8' } }; 
        footerCellActive.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

        worksheet.mergeCells(`E ${lastRowNumber+1} : H ${lastRowNumber+1}`);
        const footerCellInActive = worksheet.getCell(`E ${lastRowNumber+1}`);
        footerCellInActive.value = `Total No. Of Inactive Teachers : ${totalInactiveTeachers}`;
        footerCellInActive.font = { size: 10, bold: false, color: { argb: '002060' } };
        footerCellInActive.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'b6dde8' } }; 
        footerCellInActive.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

        worksheet.mergeCells(`A ${lastRowNumber+2} : H ${lastRowNumber+2}`);
        const footerCellSigned = worksheet.getCell(`A ${lastRowNumber+2}`);
        footerCellSigned.value = `Verified by : elearn Software Pvt Ltd`;
        footerCellSigned.font = { size: 10, bold: false, color: { argb: '9c0006' } };
        footerCellSigned.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffc7ce' } }; 
        footerCellSigned.border = {
            top: { style: 'thin', color: { argb: '7f7f7f' } },
            left: { style: 'thin', color: { argb: '7f7f7f' } },
            bottom: { style: 'thin', color: { argb: '7f7f7f' } },
            right: { style: 'thin', color: { argb: '7f7f7f' } },
        };

        //Save the Excel file to the Downloads folder
        const downloadsFolder = getDownloadsFolder();
        const filePath = path.join(downloadsFolder, `TeacherLists_${new Date().toISOString().split('T')[0]}.xlsx`);
        await workbook.xlsx.writeFile(filePath);

        return this.sendSuccessResponse(res, true, "ExcelSheet Downloaded !!");

    });

    private getTeacherList = async(req: Request, res: Response): Promise<any> =>{
        try{
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
                        '_id': 1, 'username': 1, 'name': 1, 'email': 1, 'phone': 1, 'gender': 1, 
                        'status': 1, 'address': 1, 'imgUrl': 1, 'courseList': 1, 
                        'faculityCourse': 1
                    }
                },{'$sort': {'name': 1}}
            ];
    
            const response = await teachersDB.aggregate(teacherList);
            const faculityCourseIds = new Set(response.flatMap(item => item.faculityCourse.map((course: any) => course._id)));
            response.forEach(item => {
                item.faculityCourse.forEach((courseItem: any) => {
                    if (!item.courseList.some((course: any) => course._id !== courseItem._id)) {
                        item.courseList.push(courseItem);
                    }
                });
            });
            return response;
        }catch(err){
            return this.sendServerErrorResponse(res, false, `SERVER_ERROR!!${err}`);
        }
    };

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