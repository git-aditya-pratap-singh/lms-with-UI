import { Request, Response } from 'express';
import jwt, {TokenExpiredError} from "jsonwebtoken";
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
    });

    public ForgetPswdSendOTPtoEmail = asyncHandler(async(req: Request, res: Response): Promise<any> =>{
       const {emailS} = req.body;
       const emailCheck: any = await this.findUserByEmail(emailS);

        if(!emailCheck)
            return this.sendErrorResponse(res, false, "This email isn't Registered !!");
        if(emailCheck?.status !== 'Enabled')
            return this.sendErrorResponse(res, false, "User account not Activated !!");

        const generateOTP = await new CommonServices().generateOTP();
        if(!generateOTP)
            return this.sendErrorResponse(res, false, "OTP isn't to be generated !!");

        if(!await this.storeOTPtoDB(res, emailS, generateOTP.otp, generateOTP.token))
            return this.sendErrorResponse(res, false, "OTP isn't to be stored!!");

        if(!await this.sendOTPtoEmail(res, emailCheck?.username, generateOTP?.otp, emailS))
            return this.sendErrorResponse(res, false, "OTP doesn't send on your email!!");

        return this.sendSuccessResponse(res, true, "OTP has sent to your email!!");
    });

    public ForgetPswdVerifiedOTP = asyncHandler(async(req: Request, res: Response): Promise<any>=>{
        const {OTP} = req.body;
        const otpVerifiedStatus: any = await loginDB.findOne({forgetPswdOtp: OTP},{forgetPswdOtp: 1, forgetPswdToken: 1});
        if(!otpVerifiedStatus)
            return this.sendErrorResponse(res, false, "OTP do not match, Please enter valid OTP !!")
        await this.verifiedOTPTokenforPassword(res, otpVerifiedStatus?.forgetPswdOtp, otpVerifiedStatus?.forgetPswdToken);   
    });

    public ChangePassword = asyncHandler(async(req: Request, res: Response): Promise<any>=>{
        const {Email, Password} = req.body;
        const pswdMatch: any = await AUTH_PASSWORD.passwordEncrypt(Password);

        const chngePswdStatus = await loginDB.updateOne(
            { email: Email },
            {$set: {
                password: pswdMatch
            }},
            {$new: true}
        )
        if(!chngePswdStatus)
            return this.sendErrorResponse(res, false, "Password do not changed !!");
        return this.sendSuccessResponse(res, true, "Password has been Changed Successfully !!");
    });

    public LoginSendOTPtoEmail = asyncHandler(async(req: Request, res: Response): Promise<any>=>{
        const {Email, key} = req.body;
        const emailCheck: any = await this.findUserByEmail(Email);
        console.log(emailCheck)

        if(!emailCheck)
            return this.sendErrorResponse(res, false, "This email isn't Registered !!");
        if(emailCheck?.status !== 'Enabled')
            return this.sendErrorResponse(res, false, "User account not Activated !!");

        const generateOTP = await new CommonServices().generateOTP();
        if(!generateOTP)
            return this.sendErrorResponse(res, false, "OTP isn't to be generated !!");
        //---------LOGIN TOKENS GENERATE-------------------
        const tokens: string = await this.createJWTToken(emailCheck, key);

        if(!await this.storeOTPtoDB(res, Email, generateOTP?.otp, tokens, key))
            return this.sendErrorResponse(res, false, "OTP isn't to be stored!!");

        if(!await this.sendOTPtoEmail(res, emailCheck?.username, generateOTP?.otp, Email))
            return this.sendErrorResponse(res, false, "OTP doesn't send on your email!!");

        return this.sendSuccessResponse(res, true, "OTP has sent to your email!!");
    });

    private findUserByEmail = async(email: string): Promise<any> => {
        return await loginDB.findOne({ email: email }, { username: 1, status: 1 });
    }

    private GetuserByloginPass = async(userName: string): Promise<IUser | null>=>{
        const userMatch: IUser | null = await loginDB.findOne({$or: [{username: userName}, {email: userName}]},
            {_id: 1, username: 1, name: 1, password: 1, designation: 1, 
                status: 1, hasAllAccess: 1, email: 1, phone: 1, dob: 1, gender: 1, address: 1}
        );
        return userMatch;
    };

    // private emailValid = (email: string): boolean => {
    //     const pattern: RegExp =
    //         /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))@(bdsus\.net|crescdata\.com)$/i;
    //     return pattern.test(email);
    // }

    private createJWTToken = async(userValid: any, key?: string): Promise<string> =>{
        const payload: any = {
            _id: userValid._id,
            username: userValid.username,
            name: userValid.name,
            designation: userValid.designation,
            status: userValid.status,
            allAccess: userValid.hasAllAccess,
            loginKey: "viaPassword"
        };
        if (key == "viaOTP") 
            payload.loginKey = 'viaOTP';

        const token: string = jwt.sign(
            payload,
            process.env.TOKEN_SECRET_KEY as string,
            {
                expiresIn: process.env.TOKEN_EXPIRY_TIME,
            }
        );
        return token;
    };

    private storeOTPtoDB = async(res: Response, email: string, generateOTP: any, tokens: any, key?: string ): Promise<any> =>{
        const emailExists = await loginDB.findOne({email: email});
        if(!emailExists)
            return this.sendErrorResponse(res, false, "User Record Not Found To Store OTP");

        let saveOtp;
        
        (key == "viaOTP") ?
            saveOtp = await loginDB.updateOne(
                {email: email},
                {$set: {
                    loginOtp:  generateOTP
                }},
                {$new: true}
            )
            
        :
            saveOtp = await loginDB.updateOne(
                {email: email},
                {$set: {
                    forgetPswdToken: tokens,
                    forgetPswdOtp:  generateOTP
                }},
                {$new: true}
            )
        if(!saveOtp) 
                return false;
        return true;
    };

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

    private verifiedOTPTokenforPassword = async(res: Response, otp: number, tokens: string): Promise<any>=>{
        try{
            jwt.verify(tokens, process.env.OTP_TOKEN_SECRET_KEY as string, (err: any, decode: any)=>{
                if(err)
                    return (err instanceof TokenExpiredError) ? 
                    this.sendErrorResponse(res, false, "OTP has expired. Please request a new OTP!")
                    : this.sendErrorResponse(res, false, "OTP Token has been Corrupted!!")
                else
                  return otp == decode?.tokenOTP ?  
                  this.sendSuccessResponse(res, true, "Verified-Tokens") : 
                  this.sendErrorResponse(res, false, "Please enter valid OTP !!");
            })
        }catch(err){
            return this.sendServerErrorResponse(res, false, `SERVER_ERROR!!${err}`);
        }
    };


}
export default LoginControllers;