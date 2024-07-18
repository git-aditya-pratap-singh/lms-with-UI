import {Response} from 'express';
import jwt from 'jsonwebtoken';
import AlertService from './AlertService';

class CommonServices extends AlertService{

    public createUserName = async( userName: string, res: Response): Promise<string | any> =>{
        try{ 
            return userName.toLowerCase().split(" ").join('-') + '@' + Math.floor(Math.random() * 1000);
        }catch(err){
            return this.sendServerErrorResponse(res, false, `SERVER_ERROR!!${err}`);
        }
    }

    public generateOTP = (): any =>{
        let digits = '0123456789';
        let otpLength = 4;
        let otp = '';
        for(let i=1; i<=otpLength; i++){
            var index = Math.floor(Math.random()*(digits.length));
            otp = otp + digits[index];
        }
        return (otp === '' || otp === null) ? false : this.genrateOTPtoken(otp);
    }

    private genrateOTPtoken = async(otp: string): Promise<{otp: string, token: string}> =>{
        const token: string = jwt.sign({tokenOTP: otp}, 
            process.env.OTP_TOKEN_SECRET_KEY as string,
            {expiresIn: process.env.OTP_TOKEN_EXPIRY_TIME}
        )
        return {otp, token};
    }

}
export default CommonServices;