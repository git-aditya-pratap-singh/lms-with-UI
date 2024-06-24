import express, {Request, Response} from 'express';
import AlertService from '../../../helpers/AlertService';
import asyncHandler from '../../../utils/asyncHandler';

class TeachersControllers extends AlertService {

    private createUserName = async( userName: string, res: Response): Promise<string | any> =>{
        try{
           return ""
        }catch(err){
            return this.sendServerErrorResponse(res, false, `SERVER_ERROR!!${err}`,);
        }
        
    }

    public addTeachers = asyncHandler( async(req: Request, res: Response): Promise<any> =>{
        console.log("HIIIIII",req.body)
        const {name, email, phone, course, gender, status, address, imgUrl} = req.body;
        const userName: string = await this.createUserName(name, res);
    })

}

export default TeachersControllers;