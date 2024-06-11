import express, {Request, Response} from 'express';
import AlertService from '../../../helpers/AlertService';
import asyncHandler from '../../../utils/asyncHandler';

class AdminModelControllers extends AlertService {

    public updateDetails = asyncHandler( async(req: Request, res: Response): Promise<any> =>{
        console.log(req.body)

    })

}
export default AdminModelControllers;