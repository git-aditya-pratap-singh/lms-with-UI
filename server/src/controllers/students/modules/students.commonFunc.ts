import { Request, Response } from "express";
import AlertService from "../../../helpers/AlertService";
import studentsDB from "../../../models/students.schema";

class StudentCommonFunc extends AlertService {

    public credentialCheck = async(email: string, phone: string, res: Response): Promise<any> =>{
        try{
           const response = await studentsDB.findOne({
            $or: [
                {email: email},
                {phone: phone}
            ]
           })
           return response;
        }catch(err){
            return this.sendServerErrorResponse(res, false, `SERVER_ERROR!!${err}`);
        }
    };
}

export default StudentCommonFunc;