import { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import IUser from './login.interface';
import asyncHandler from '../../../utils/asyncHandler';
import AlertService from '../../../helpers/AlertService';
import Password_Encrypt_Decrypt from "../../../helpers/PswdEncrypt";
import loginDB from '../../../models/login.schema';

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
        return this.sendSuccessResponse(res, true, "You have successfully logged in !!", {userValid, token});

    })

    private GetuserByloginPass = async(userName: string): Promise<IUser | null>=>{
        const userMatch: IUser | null = await loginDB.findOne({username: userName},
            {_id: 1, username: 1, name: 1, password: 1, designation: 1, status: 1, hasAllAccess: 1}
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

}
export default LoginControllers;