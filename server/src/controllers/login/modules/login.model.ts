import { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import IUser from './login.interface';
import asyncHandler from '../../../utils/asyncHandler';
import AlertService from '../../../helpers/AlertService';
import Password_Encrypt_Decrypt from "../../../helpers/PswdEncrypt";
import loginDB from '../../../models/login.schema';
import NewMailFunctions from "../../../mail/mail.controllers";
import CommonServices from "../../../helpers/common.services";

dotenv.config();
const AUTH_PASSWORD = new Password_Encrypt_Decrypt();
const INSTANCE_OF_MAIL = new NewMailFunctions();

class LoginControllers extends AlertService{

    public Login = asyncHandler(async(req: Request, res: Response): Promise<any> =>{
       
        const {username, password} = req.body;
        const userValid = await this.GetuserByloginPass(username.toLowerCase());
        if(!userValid)
            return this.sendErrorResponse(res, false, "User not found !!");
        
        if(userValid.status !== 'Enabled')
            return this.sendErrorResponse(res, false, "User account not Activated !!");

        const pswdMatch: boolean = await AUTH_PASSWORD.passwordDecrypt(password, userValid.password);
        if (!pswdMatch) 
            return this.sendErrorResponse(res, false, "Invalid Password !!");
         
        const token: string = await this.createJWTToken(userValid);
        return this.sendSuccessResponseToken(res, true, "You have successfully logged in !!", {userValid, token});
    })

    public ForgetPswdSendOTPtoEmail = asyncHandler(async(req: Request, res: Response): Promise<any> =>{

       const emailCheck: any = await loginDB.findOne({email: req.body.email});
        if(!emailCheck){
          return this.sendErrorResponse(res, false, "This email isn't Registered !!");
        }
        const generateOTP = await new CommonServices().generateOTP();
        if(!generateOTP)
            return this.sendErrorResponse(res, false, "OTP isn't to be generated !!");
        console.log(generateOTP)
        if(!await this.storeOTPtoDB(req.body.email, generateOTP, res))
            return this.sendServerErrorResponse(res, false, "OTP isn't to be stored!!");

        if(!await this.sendOTPtoEmail(res, emailCheck?.username, generateOTP?.otp, req.body.email))
            return this.sendErrorResponse(res, false, "OTP doesn't send on your email!!");

        return this.sendSuccessResponse(res, true, "OTP has sent to your email!!");
    })

    private GetuserByloginPass = async(userName: string): Promise<IUser | null>=>{
        const userMatch: IUser | null = await loginDB.findOne({$or: [{username: userName}, {email: userName}]},
            {_id: 1, username: 1, name: 1, password: 1, designation: 1, 
                status: 1, hasAllAccess: 1, email: 1, phone: 1, dob: 1, gender: 1, address: 1}
        );
        return userMatch;
    }

    // private emailValid = (email: string): boolean => {
    //     const pattern: RegExp =
    //         /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))@(bdsus\.net|crescdata\.com)$/i;
    //     return pattern.test(email);
    // }

    private createJWTToken = async(userValid: any): Promise<string> =>{
        const token: string = jwt.sign(
            { _id: userValid._id, username: userValid.username, name: userValid.name, designation: userValid.designation, 
            status: userValid.status, allAccess: userValid.hasAllAccess, loginKey: 'viaPassword'}, 
            process.env.TOKEN_SECRET_KEY as string, 
            {
                expiresIn: process.env.TOKEN_EXPIRY_TIME,
            });
        return token;
    }

    private storeOTPtoDB = async(email: string, generateOTP: any, res: Response): Promise<any> =>{
        const emailExists = await loginDB.findOne({email: email});
        if(!emailExists)
            return this.sendErrorResponse(res, false, "User Record Not Found To Store OTP");
        const saveOtp = await loginDB.updateOne(
            {email: email},
            {$set: {
                forgetPswdToken: generateOTP?.token,
                forgetPswdOtp:  generateOTP?.otp
            }},
            {upsert: true, new: true}
        )
        if(!saveOtp) 
            return false;
        return true;
    }

    private sendOTPtoEmail = async(res: Response, name: string, otp: number, email: string): Promise<boolean | any> =>{
        try{
            const toEmail = email;
            const subject: string = '🪬Your OTP send from elearn SoftTech Pvt. Ltd';
            const messagehtml = `
                <p>Dear ${name},</p>
                <p><strong>Your OTP is: </strong> <span style="color: #007DFC">${otp}</span></p>
                <p>Please, don't share to OTP.</p><br><br>
                <p style="color: #007DFC">Best regards,</p>
                <p style="color: #007DFC">elearn SoftTech Pvt. Ltd</p>
                <p style="color: #007DFC">Address: WMGV+P43, Varthur Main Rd, Devarabisanahalli, Uttarahalli Hobli, Bengaluru, Karnataka 560103</p>`
    
            const sent = await INSTANCE_OF_MAIL.newSmtpMail(toEmail, subject, messagehtml)
            return sent ? true : false;
        }catch(err){
            return this.sendServerErrorResponse(res, false, `SERVER_ERROR!!${err}`);
        }
    };
    // private sendOTPtoEmail = async(res: Response): Promise<any> =>{
    //     try{
    //         const sendmail = new NewMailFunctions();
    //         // let mailData = {};

    //         // let temp = JSON.stringify(empinfo)
    //         // const {empCode, firstName, match_email} = JSON.parse(temp);

    //         const toEmail = "aps08072001@gmail.com";
    //         const subject: string = 'elearn Login via OTP';
    //         const message: string = `<h1 style="font-weight:bold; font-style: italic; font-size:15px">Hello,</h1>
    //         <p>Your OTP is </p>
    //         <br><br>
    //         <p style="color: blue;">Best regards,<br>
    //         .</p>`;

    //         // if(!await this.storeOTPtoDB( res)){
    //         //     return this.sendErrorResponse(res, 0, "Failed to Update OTP")
    //         // }
    //         // chnages ToEmail here...............................................................
    //         const sent = await sendmail.newSmtpMail(toEmail, subject, message)
    //         if(!sent){
    //             return this.sendErrorResponse(res, false, "Failed to sent OTP")
    //         }

    //         // return mailData = {
    //         //     email: toEmail,
    //         //     sent: 1,
    //         //     empCode: empCode,
    //         //     msg: "Successfully otp sent"
    //         // }

    //     }catch(err){
    //         return this.sendServerErrorResponse(res, false, "SERVER_ERROR!!")
    //     }
    // }

}
export default LoginControllers;