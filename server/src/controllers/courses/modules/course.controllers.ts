import {Request, Response} from 'express';
import AlertService from '../../../helpers/AlertService';
import asyncHandler from '../../../utils/asyncHandler';

class CourseControllers extends AlertService {

    public addCourse = asyncHandler( async(req: Request, res: Response): Promise<any> =>{
        console.log("HIIIIII",req.body)
    })

}

export default CourseControllers;