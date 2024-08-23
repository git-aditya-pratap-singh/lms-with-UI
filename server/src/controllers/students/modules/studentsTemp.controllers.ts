import { NextFunction, Request, Response } from "express";
import {ObjectId} from 'mongodb';
import mongoose, { PipelineStage } from 'mongoose';
import jwt, { TokenExpiredError } from "jsonwebtoken";
import AlertService from "../../../helpers/AlertService";
import asyncHandler from "../../../utils/asyncHandler";
import EmailSetupService from "../../../mail/emailSetup.services";
import CommonServices from "../../../helpers/common.services";
import StudentCommonFunc from "./students.commonFunc";
import tempStudentsDB from "../../../models/tempStudent.schema";

class StudentTempControllers extends AlertService {

    public getTempStudentsList = asyncHandler(async(req: Request, res: Response): Promise<any>=>{
        const tempstudentList: PipelineStage[] = [
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
        const response = await tempStudentsDB.aggregate(tempstudentList);
        return this.sendSuccessResponse(res, true, "Fetch-Succefully!!", response);
    });

    
    public StudentAddTempOTP = asyncHandler(async(req: Request, res: Response): Promise<any>=>{
        const {email, phone} = req.body;
        const regisData = req.body;
        const credential: any = await new StudentCommonFunc().credentialCheck(email, phone, res);
        if(credential)
            return this.sendErrorResponse(res, false, "This User is already exists!!");

        const {otp, token}: any = await new CommonServices().generateOTP();
        const otpSentStatus = await new EmailSetupService().sendOTPtoEmail(res, otp, email);

        if(!otpSentStatus)
            return this.sendErrorResponse(res, false, "OTP hasn't sent on your email !!")
        return this.sendSuccessResponse(res, true, "OTP has sent on your email !!", {token, regisData});
    });

    public TempStudentAdd = asyncHandler(async(req: Request, res: Response, next: NextFunction, session?: mongoose.ClientSession): Promise<any>=>{
        const {OTP, TOKEN, formData} = req.body;
        const otpStatus = await this.OTPverified(res, OTP, TOKEN);
        if(otpStatus){
            const {name, email, phone, course, gender, status, address, imgUrl} = formData;
            const courseList: ObjectId[] = course.map((courseItem: any) => new ObjectId(courseItem.value));
            const studentData = new tempStudentsDB({
               name: name,
               email: email,
               phone: phone,
               gender: gender,
               course: courseList,  
               address: address,
            });
            await studentData.save({ session })
            .then(saveData =>{
                const emailSent = new EmailSetupService().sendEmailForRegistered(res, name, email);
                if(!emailSent)
                    return this.sendErrorResponse(res, false, "Failed to Send Credential on your email !!")
                return this.sendSuccessResponse(res, true, "Credentials Added Successfully!!");
            })
            .catch(err =>{
                return this.sendErrorResponse(res, false, "Credentials hasn't Added!!");
            })
        }
    });

    private OTPverified = async(res: Response,  otp: number, token: string): Promise<any>=>{
        try{
            const decoded: any = jwt.verify(token, process.env.OTP_TOKEN_SECRET_KEY as string);
            console.log(decoded)
            if (otp != decoded?.tokenOTP)
                return this.sendErrorResponse(res, false, 'OTP do not match. Please enter valid OTP !!');
            return true;
        }catch(err){
            if (err instanceof TokenExpiredError) 
                return this.sendErrorResponse(res, false, 'OTP has expired. Please request a new OTP !!');
        }
    }

       
}

export default StudentTempControllers;