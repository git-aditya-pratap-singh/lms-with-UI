import {Request, Response} from 'express';
import AlertService from '../../../helpers/AlertService';
import asyncHandler from '../../../utils/asyncHandler';
import CommonServices from '../../../helpers/common.services';
import Password_Encrypt_Decrypt from '../../../helpers/PswdEncrypt';
import NewMailFunctions from "../../../mail/mail.controllers";

import teachersDB from '../../../models/teachers.schema'; 

const INSTANCE_OF_PSWD = new Password_Encrypt_Decrypt();
const INSTANCE_OF_MAIL = new NewMailFunctions();

class TeachersControllers extends AlertService {

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
    }

    private credentialUsernameCheck = async(userName: string, res: Response): Promise<any> =>{
        try{
            const response = await teachersDB.findOne({
                username: userName
            })
           return response;
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
    }

    public addTeachers = asyncHandler( async(req: Request, res: Response): Promise<any> =>{
      
        const {name, email, phone, course, gender, status, address, imgUrl} = req.body;

        const credential: any = await this.credentialCheck(email, phone, res);
        if(credential){
            return this.sendErrorResponse(res, false, "This User is already exists!!")
        }

        const userName: string = await new CommonServices().createUserName(name, res);
        if(userName){
            return this.sendErrorResponse(res, false, "This Username is already exists!!")
        }

        const generatePswd: any = await this.generatePassword(name, res);
        if(!generatePswd){
            return this.sendErrorResponse(res, false, "Password isn't to be generated!!")
        }

        const toEmail = email;
        const subject: string = '🪬Your Account Credential from elearn SoftTech Pvt. Ltd';
        const messagehtml = `
            <p>Dear ${name},</p>
            <p>Your account has been created successfully. Below are your login Credential:</p>
            <p><strong>Username:</strong> <span style="color: #007DFC">${userName}</span></p>
            <p><strong>Password:</strong> <span style="color: #007DFC">${generatePswd.pswd}</span></p>
            <p>Please keep this information safe and secure.</p><br><br>
            <p style="color: #007DFC">Best regards,</p>
            <p style="color: #007DFC">elearn SoftTech Pvt. Ltd</p>
            <p style="color: #007DFC">Address: WMGV+P43, Varthur Main Rd, Devarabisanahalli, Uttarahalli Hobli, Bengaluru, Karnataka 560103</p>`

        const sent = await INSTANCE_OF_MAIL.newSmtpMail(toEmail, subject, messagehtml)
        if(!sent){
            return this.sendErrorResponse(res, false, "Failed to Send Credential on your email !!")
        }

        const response = await new teachersDB({
           username: userName,
           name: name,
           password: generatePswd.encyPswd,
           email: email,
           phone: phone,
           gender: gender,
           //course: [new ObjectId("edeferfrfdce988u80fef")],     course pr kaam krna baki hai abhi
           status: status,
           address: address,
           imgUrl: imgUrl,
           admin_logs: req?.user?.username

        });
        response.save()
        .then(saveData =>{
            return this.sendSuccessResponse(res, true, "Credentials Added Successfully!!");
        })
        .catch(err =>{
            return this.sendErrorResponse(res, false, "Credentials hasn't Added!!");
        })
    });

    public editTeachers = asyncHandler( async(req: Request, res: Response): Promise<any>=>{
        console.log(req.body)
        const {name, email, phone, course, gender, status, address, imgUrl} = req.body;
    })

}

export default TeachersControllers;