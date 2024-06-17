import express, {Request, Response} from 'express';
import AlertService from '../../../helpers/AlertService';
import asyncHandler from '../../../utils/asyncHandler';
import loginDB from '../../../models/login.schema';

class AdminModelControllers extends AlertService {

    public getProfileDetails = asyncHandler( async(req: Request, res: Response): Promise<any>=>{
        const user: any = req.user;
        const userDetails = await loginDB.findOne(
            {_id: user._id},
            {username: 1, name: 1, designation: 1, email: 1, phone: 1, status: 1, hasAllAccess: 1,  gender: 1, dob: 1, address: 1}
        )
        return this.sendSuccessResponse(res, true, "Fetch-Succefully", userDetails);

    })

    public updateDetails = asyncHandler( async(req: Request, res: Response): Promise<any> =>{
        
        const {_id, username, name, email, phone, hasAllAccess, dob, gender, address} = req.body;
        const updateDetails = await loginDB.findByIdAndUpdate(
            {_id: _id},
            {$set: {
               username: username,
               name: name,
               email: email,
               phone: phone,
               hasAllAccess: hasAllAccess,
               dob: dob,
               gender: gender,
               address: address
            }},
            {$upsert: true, $new: true}
        )
        if(updateDetails === null){
            return this.sendErrorResponse(res, false, "Data not be Updated!!");
        }
        const responseResult: any = 
        {   _id: updateDetails._id, 
            username: updateDetails.username, 
            name: updateDetails.name, 
            email: updateDetails.email, 
            phone: updateDetails.phone, 
            hasAllAccess: updateDetails.hasAllAccess, 
            dob: updateDetails.dob, 
            gender: updateDetails.gender, 
            address: updateDetails.address
        };
        return this.sendSuccessResponse(res, true, "Data Updated Successfully!!", responseResult);
    })

    public uploadProfilePicture = asyncHandler( async(req: Request, res: Response): Promise<any>=>{
        console.log("FILE");
    })

}
export default AdminModelControllers;