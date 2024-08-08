import { Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import AlertService from "../../../helpers/AlertService";
import asyncHandler from "../../../utils/asyncHandler";
import NewMailFunctions from "../../../mail/mail.controllers";
import CommonServices from "../../../helpers/common.services";
import StudentCommonFunc from "./students.commonFunc";

class StudentTempControllers extends AlertService {

    public StudentAddTempOTP = asyncHandler(async(req: Request, res: Response): Promise<any>=>{
        console.log(req.body)
        const {name, email, phone, course, gender, address} = req.body;
        const credential: any = await new StudentCommonFunc().credentialCheck(email, phone, res);
        if(credential)
            return this.sendErrorResponse(res, false, "This User is already exists!!");
        //generate token and send OTP to mail.
        const {otp, token}: any = await new CommonServices().generateOTP();
        // otp send to email-----
        const otpSentStatus = await this.sendOTPtoEmail(res, otp, email);
        if(!otpSentStatus)
            return this.sendErrorResponse(res, false, "OTP hasn't sent on your email !!")
        const regisData = req.body;
        return this.sendSuccessResponse(res, true, "OTP has sent on your email !!", {token, regisData});
    });

    public TempStudentAdd = asyncHandler(async(req: Request, res: Response): Promise<any>=>{
        console.log("+++++++----->>>",req.body)
        const {OTP, TOKEN, formData} = req.body;
        //--token verified and otp verified after the you can register students
        const otpStatus = await this.OTPverified(res, OTP, TOKEN);
        console.log("RESP->>>",otpStatus)

    });

    private sendOTPtoEmail = async(res: Response, otp: number, email: string): Promise<boolean | any> =>{
        try{
            const toEmail = email;
            const subject: string = '🪬Your OTP send from elearn SoftTech Pvt. Ltd';
            const messagehtml = `
                <p>Hi dear,</p>
                <p><strong>Your OTP is: </strong> <span style="color: #007DFC">${otp}</span></p>
                <p>Please, don't share to OTP.</p><br><br>
                <p style="color: #007DFC">Best regards,</p>
                <p style="color: #007DFC">elearn SoftTech Pvt. Ltd</p>
                <p style="color: #007DFC">Address: WMGV+P43, Varthur Main Rd, Devarabisanahalli, Uttarahalli Hobli, Bengaluru, Karnataka 560103</p>`
    
            const sent = await new NewMailFunctions().newSmtpMail(toEmail, subject, messagehtml)
            return sent ? true : false;
        }catch(err){
            return this.sendServerErrorResponse(res, false, `SERVER_ERROR!!${err}`);
        }
    };

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
            
            
            //     const decoded: any = jwt.verify(tokens, process.env.OTP_TOKEN_SECRET_KEY as string);
            //     if (otp !== Number(decoded?.tokenOTP))
            //         return this.sendErrorResponse(res, false, 'OTP do not match. Please enter valid OTP !!');
    
            //     if (key === 'viaOTP') {
            //         const userValid = await this.GetuserByloginPass(email);
            //         const token: string = await this.createJWTToken(userValid, key);
            //         return this.sendSuccessResponseToken(res, true, 'You have successfully logged in !!', { userValid, token });
            //     }
            //     return this.sendSuccessResponse(res, true, 'Verified OTP !!');
            // } catch (err) {
            //     if (err instanceof TokenExpiredError) {
            //         return this.sendErrorResponse(res, false, 'OTP has expired. Please request a new OTP !!');
            //     } else {
            //         console.error(`Error verifying OTP token: ${err}`);
            //         return this.sendServerErrorResponse(res, false, `SERVER_ERROR!!`);
            //     }
    }

       
}

export default StudentTempControllers;