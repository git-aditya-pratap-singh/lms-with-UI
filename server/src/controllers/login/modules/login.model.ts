import express from 'express';
import asyncHandler from '../../../utils/asyncHandler';
import AlertService from '../../../helpers/AlertService';


class LoginModels extends AlertService{

    public Login = asyncHandler(async(req: Request, res: Response): Promise<any> =>{
        try{

        }catch(err){

        }
    })

}
export default LoginModels;