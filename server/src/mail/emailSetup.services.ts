import { Request, Response } from "express";
import AlertService from "../helpers/AlertService";
import NewMailFunctions from "./mail.controllers";

class EmailSetupService extends AlertService{
    
    //--------Login OTP relates email setup---------
    public sendOTPtoEmailforLogin = async(res: Response, name: string, otp: number, email: string): Promise<boolean | any> =>{
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
    
            const sent = await new NewMailFunctions().newSmtpMail(toEmail, subject, messagehtml)
            return sent ? true : false;
        }catch(err){
            return this.sendServerErrorResponse(res, false, `SERVER_ERROR!!${err}`);
        }
    };
    //--------End of Login OTP relates email setup---------

    //--------Add Temp-Students relates email setup---------
    public sendOTPtoEmail = async(res: Response, otp: number, email: string): Promise<boolean | any> =>{
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

    public sendEmailForRegistered = async(res: Response, firstName: string, email: string): Promise<boolean | any> =>{
        try{
            const toEmail = email;
            const subject: string = '🪬elearn SoftTech Pvt. Ltd';
            const messagehtml = `
                <p>Hi ${firstName},</p>
                <p>Your Credential has been registered as temporary.<br>
                If we verify your details, we will permanently register your credentials 
                and provide you with a username and password via email.</p><br><br>
                <p style="color: #007DFC">Best regards,</p>
                <p style="color: #007DFC">elearn SoftTech Pvt. Ltd</p>
                <p style="color: #007DFC">Address: WMGV+P43, Varthur Main Rd, Devarabisanahalli, Uttarahalli Hobli, Bengaluru, Karnataka 560103</p>`
    
            const sent = await new NewMailFunctions().newSmtpMail(toEmail, subject, messagehtml)
            return sent ? true : false;
        }catch(err){
            return this.sendServerErrorResponse(res, false, `SERVER_ERROR!!${err}`);
        }
    };
    //--------End of Add Temp-Students relates email setup---------
    
    // ---------- send a credential on email after Add student Credential -------------------
    public sendCredentialsByEmailOfStudents = async(res: Response, name: string, userName: string, password: string, email: string): Promise<boolean | any> =>{
        try{
            const toEmail = email;
            const subject: string = '🪬Your Account Credential from elearn SoftTech Pvt. Ltd';
            const messagehtml = `
                <p>Dear ${name},</p>
                <p>Your account has been created successfully. Below are your login Credential:</p>
                <p><strong>Username:</strong> <span style="color: #007DFC">${userName}</span></p>
                <p><strong>Password:</strong> <span style="color: #007DFC">${password}</span></p>
                <p>Please keep this information safe and secure.</p><br><br>
                <p style="color: #007DFC">Best regards,</p>
                <p style="color: #007DFC">elearn SoftTech Pvt. Ltd</p>
                <p style="color: #007DFC">Address: WMGV+P43, Varthur Main Rd, Devarabisanahalli, Uttarahalli Hobli, Bengaluru, Karnataka 560103</p>`
    
            const sent = await new NewMailFunctions().newSmtpMail(toEmail, subject, messagehtml)
            return sent ? true : false;
        }catch(err){
            return this.sendServerErrorResponse(res, false, `SERVER_ERROR!!${err}`);
        }
    };
    // ---------- End of send a credential on email after Add student Credential -------------------

    // ---------- send a credential on email after Add teachers Credential -------------------
    public sendCredentialsByEmailOfTeachers = async(res: Response, name: string, userName: string, password: string, email: string): Promise<boolean | any> =>{
        try{
            const toEmail = email;
            const subject: string = '🪬Your Account Credential from elearn SoftTech Pvt. Ltd';
            const messagehtml = `
                <p>Dear ${name},</p>
                <p>Your account has been created successfully. Below are your login Credential:</p>
                <p><strong>Username:</strong> <span style="color: #007DFC">${userName}</span></p>
                <p><strong>Password:</strong> <span style="color: #007DFC">${password}</span></p>
                <p>Please keep this information safe and secure.</p><br><br>
                <p style="color: #007DFC">Best regards,</p>
                <p style="color: #007DFC">elearn SoftTech Pvt. Ltd</p>
                <p style="color: #007DFC">Address: WMGV+P43, Varthur Main Rd, Devarabisanahalli, Uttarahalli Hobli, Bengaluru, Karnataka 560103</p>`
    
            const sent = await new NewMailFunctions().newSmtpMail(toEmail, subject, messagehtml)
            return sent ? true : false;
        }catch(err){
            return this.sendServerErrorResponse(res, false, `SERVER_ERROR!!${err}`);
        }
    };
    // ---------- End of send a credential on email after Add teachers Credential -------------------
}

export default EmailSetupService;