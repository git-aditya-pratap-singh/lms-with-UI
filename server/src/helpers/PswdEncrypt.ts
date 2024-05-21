import express from 'express';
import AlertService from './AlertService';
import asyncHandler from '../utils/asyncHandler';

class Password_Encrypt_Decrypt extends AlertService{

    public passwordEncrypt = asyncHandler( async(password: String): Promise<string>=>{
        try{
            const setRounds: number = 10;
            const hashedPassword: string = await bcrypt.hash(password, setRounds);
            return hashedPassword;
        }
        catch(err){
            return this.sendServerErrorResponse(res, 0, "SERVER_ERROR!!")
        }
    })

    public passwordDecrypt = asyncHandler( async(password: String, hashedPassword: String): Promise<boolean>=>{
        try{
            return bcrypt.compare(password, hashedPassword);
        }
        catch(err){
            return this.sendServerErrorResponse(res, 0, "SERVER_ERROR!!")
        }
    })
}
export default Password_Encrypt_Decrypt;