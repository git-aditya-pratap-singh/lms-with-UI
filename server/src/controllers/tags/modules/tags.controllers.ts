import { Request, Response } from 'express';
import AlertService from '../../../helpers/AlertService';
import asyncHandler from '../../../utils/asyncHandler';
import tagsDB from '../../../models/tags.schema';

class TagsControllers extends AlertService {

    public getCourseTags = asyncHandler( async(req: Request, res: Response): Promise<any>=>{
        const response = await tagsDB.find({
            status: {$ne: "Disabled"}
        });
        return this.sendSuccessResponse(res, true, "fetch Successfully!", response)

    })
}
export default TagsControllers;