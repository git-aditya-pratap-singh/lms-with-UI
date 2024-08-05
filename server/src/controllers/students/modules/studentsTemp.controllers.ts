import { Request, Response } from "express";
import AlertService from "../../../helpers/AlertService";
import asyncHandler from "../../../utils/asyncHandler";
import StudentCommonFunc from "./students.commonFunc";

class StudentTempControllers extends AlertService {

    public StudentAddTemp = asyncHandler(async(req: Request, res: Response): Promise<any>=>{
        console.log(req.body)
        const {name, email, phone, course, gender, address} = req.body;
        const credential: any = await new StudentCommonFunc().credentialCheck(email, phone, res);
        if(credential)
            return this.sendErrorResponse(res, false, "This User is already exists!!")

    });
}

export default StudentTempControllers;