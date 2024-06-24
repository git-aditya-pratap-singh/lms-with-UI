import { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import IUser from './login.interface';
import asyncHandler from '../../../utils/asyncHandler';
import AlertService from '../../../helpers/AlertService';
import Password_Encrypt_Decrypt from "../../../helpers/PswdEncrypt";
import loginDB from '../../../models/login.schema';
import NewMailFunctions from "../../../mail/mail.controller";

dotenv.config();
const AUTH_PASSWORD =  new Password_Encrypt_Decrypt();

class LoginControllers extends AlertService{

    public Login = asyncHandler(async(req: Request, res: Response): Promise<any> =>{
       
        const {username, password} = req.body;
        const userValid = await this.GetuserByloginPass(username.toLowerCase());

        if(!userValid){
            return this.sendErrorResponse(res, false, "User not found !!");
        }
        if(userValid.status !== 'Enabled'){
            return this.sendErrorResponse(res, false, "User account not Activated !!");
        }

        const pswdMatch: boolean = await AUTH_PASSWORD.passwordDecrypt(password, userValid.password);

        if (!pswdMatch) {
            return this.sendErrorResponse(res, false, "Invalid Password !!");
        }
         
        const token: string = await this.createJWTToken(userValid);
        return this.sendSuccessResponseToken(res, true, "You have successfully logged in !!", {userValid, token});

    })

    private GetuserByloginPass = async(userName: string): Promise<IUser | null>=>{
        const userMatch: IUser | null = await loginDB.findOne({$or: [{username: userName}, {email: userName}]},
            {_id: 1, username: 1, name: 1, password: 1, designation: 1, 
                status: 1, hasAllAccess: 1, email: 1, phone: 1, dob: 1, gender: 1, address: 1}
        );
        return userMatch;
    }

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