import {Request, Response} from 'express';
import asyncHandler from '../../../utils/asyncHandler';
import AlertService from '../../../helpers/AlertService';
import courseDB from '../../../models/course.schema';

class FetchCourseList extends AlertService{

    public getCourseList = asyncHandler( async(req: Request, res: Response): Promise<any>=>{
        const response = await courseDB.find({
            status: {$ne: "Disabled"}
        },{
            _id: 1,
            name: 1
        })
        return this.sendSuccessResponse(res, true, "Course fetched!!", response);
    })

}
export default FetchCourseList;