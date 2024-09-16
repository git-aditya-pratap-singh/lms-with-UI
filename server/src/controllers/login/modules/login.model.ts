import { Request, Response } from 'express';
import jwt, {TokenExpiredError} from "jsonwebtoken";
import dotenv from "dotenv";
import IUser from './login.interface';
import asyncHandler from '../../../utils/asyncHandler';
import AlertService from '../../../helpers/AlertService';
import Password_Encrypt_Decrypt from "../../../helpers/PswdEncrypt";
import loginDB from '../../../models/login.schema';
import EmailSetupService from "../../../mail/emailSetup.services";
import CommonServices from "../../../helpers/common.services";

dotenv.config();
const AUTH_PASSWORD = new Password_Encrypt_Decrypt();
const INSTANCE_OF_MAIL = new EmailSetupService();

class LoginControllers extends AlertService{

    public Login = asyncHandler(async(req: Request, res: Response ): Promise<any> =>{
        const {email, pswd} = req.body;
        const userValid = await this.GetuserByloginPass(email.toLowerCase());
        if(!userValid)
            return this.sendErrorResponse(res, false, "User not found !!");
        if(userValid.status !== 'Enabled')
            return this.sendErrorResponse(res, false, "User account not Activated !!");
        const pswdMatch: boolean = await AUTH_PASSWORD.passwordDecrypt(pswd, userValid.password);
        if (!pswdMatch) 
            return this.sendErrorResponse(res, false, "Invalid Password !!");
        const token: string = await this.createJWTToken(userValid);

        const UserInfo = {
            name: userValid.name,
            designation: userValid.designation,
            accessType: userValid.hasAllAccess
        }

        return this.sendSuccessResponseToken(res, true, "You have successfully logged in !!", {UserInfo, token});
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
        if(!await INSTANCE_OF_MAIL.sendOTPtoEmailforLogin(res, emailCheck?.username, generateOTP?.otp, emailS))
            return this.sendErrorResponse(res, false, "OTP doesn't send on your email!!");
        return this.sendSuccessResponse(res, true, "OTP has sent to your email!!");
    });


    public ForgetPswdVerifiedOTP = asyncHandler(async(req: Request, res: Response): Promise<any>=>{
        const {email,OTP} = req.body;
        const otpVerifiedStatus: any = await loginDB.findOne({$and: [{email: email},{forgetPswdOtp: OTP}]},
            {forgetPswdOtp: 1, otpToken: 1}
        );
        if(!otpVerifiedStatus)
            return this.sendErrorResponse(res, false, "OTP do not match, Please enter valid OTP !!")
       await this.verifiedOTPToken(res, otpVerifiedStatus?.forgetPswdOtp, otpVerifiedStatus?.otpToken); 
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
        if(!emailCheck)
            return this.sendErrorResponse(res, false, "This email isn't Registered !!");
        if(emailCheck?.status !== 'Enabled')
            return this.sendErrorResponse(res, false, "User account not Activated !!");
        const generateOTP = await new CommonServices().generateOTP();
        if(!generateOTP)
            return this.sendErrorResponse(res, false, "OTP isn't to be generated !!");
        if(!await this.storeOTPtoDB(res, Email, generateOTP?.otp, generateOTP?.token, key))
            return this.sendErrorResponse(res, false, "OTP isn't to be stored!!");
        if(!await INSTANCE_OF_MAIL.sendOTPtoEmailforLogin(res, emailCheck?.username, generateOTP?.otp, Email))
            return this.sendErrorResponse(res, false, "OTP doesn't send on your email!!");
        return this.sendSuccessResponse(res, true, "OTP has sent to your email!!");
    });


    public LoginWithOTP = asyncHandler(async(req: Request, res: Response): Promise<any>=>{
        const {Email, otp, key} = req.body;
        const otpVerifiedStatus: any = await loginDB.findOne({$and: [{email: Email},{loginOtp: otp}]},{});
        if(!otpVerifiedStatus)
            return this.sendErrorResponse(res, false, "OTP do not match, Please enter valid OTP !!")
        await this.verifiedOTPToken(res, otpVerifiedStatus?.loginOtp, otpVerifiedStatus?.otpToken, Email, key);  
    });


    private findUserByEmail = async(email: string): Promise<any> => {
        return await loginDB.findOne({ email: email }, { username: 1, status: 1 });
    };


    private GetuserByloginPass = async(userName: string): Promise<IUser | null>=>{
        const userMatch: IUser | null = await loginDB.findOne({$or: [{username: userName}, {email: userName}]},
            {_id: 1, username: 1, name: 1, password: 1, designation: 1, 
                status: 1, hasAllAccess: 1, email: 1, phone: 1, dob: 1, gender: 1, address: 1}
        );
        return userMatch;
    };

    // private emailValid = (email: string): boolean => {
    //     const pattern: RegExp =
    //         /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))@(yahoo\.com|gmail\.com)$/i;
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
                    loginOtp:  generateOTP,
                    otpToken: tokens
                }},
                {$new: true}
            )   
        :
            saveOtp = await loginDB.updateOne(
                {email: email},
                {$set: {
                    forgetPswdOtp:  generateOTP,
                    otpToken: tokens,
                }},
                {$new: true}
            )
        if(!saveOtp) 
            return false;
        return true;
    };


    private verifiedOTPToken = async (res: Response, otp: number, tokens: string, email?: any, key?: string): Promise<any> => {
        try {
            const decoded: any = jwt.verify(tokens, process.env.OTP_TOKEN_SECRET_KEY as string);
            if (otp !== Number(decoded?.tokenOTP))
                return this.sendErrorResponse(res, false, 'OTP do not match. Please enter valid OTP !!');

            if (key === 'viaOTP') {
                const userValid = await this.GetuserByloginPass(email);
                const token: string = await this.createJWTToken(userValid, key);
                return this.sendSuccessResponseToken(res, true, 'You have successfully logged in !!', { userValid, token });
            }
            return this.sendSuccessResponse(res, true, 'Verified OTP !!');
        } catch (err) {
            if (err instanceof TokenExpiredError) {
                return this.sendErrorResponse(res, false, 'OTP has expired. Please request a new OTP !!');
            } else {
                console.error(`Error verifying OTP token: ${err}`);
                return this.sendServerErrorResponse(res, false, `SERVER_ERROR!!`);
            }
        }
    };
    
}
export default LoginControllers;