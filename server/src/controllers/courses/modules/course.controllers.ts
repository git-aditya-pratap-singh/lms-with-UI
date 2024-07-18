import {Request, Response} from 'express';
import {ObjectId} from 'mongodb'
import AlertService from '../../../helpers/AlertService';
import asyncHandler from '../../../utils/asyncHandler';
import courseDB from '../../../models/course.schema';

class CourseControllers extends AlertService {

    private IsCourseExists = async(courseName: string, res: Response): Promise<any>=>{
        try{
            const IsExists = await courseDB.find({
                name: {$eq: courseName.toLowerCase()}
            })
            return IsExists;
        }catch(err){
            return this.sendServerErrorResponse(res, false, `SERVER_ERROR!!${err}`)
        }
    }

    public getCourseList = asyncHandler( async(req: Request, res: Response): Promise<any>=>{
        const response = await courseDB.find({
            status: {$ne: "Disabled"}
        },{
            _id: 1,
            name: 1
        })
        return this.sendSuccessResponse(res, true, "Course fetched!!", response);
    })

    public addCourse = asyncHandler( async(req: Request, res: Response): Promise<any> =>{

        const user = req?.user;
        const {courseName, courseDescription, coursePrice, courseEstiPrice, courseTags, courseCategories, courseLevel,
            videoTitle, videoURL, sourceCode, courseBenifit, faculity, courseVideo, courselogo} = req.body;
         
        const courseTagsList: ObjectId[] = courseTags.map((tags: any) => new ObjectId(tags.value));
        const facultyList: ObjectId[] = faculity.map((faculty: any) => new ObjectId(faculty.value));

        if(!await this.IsCourseExists(courseName, res))
            return this.sendErrorResponse(res, false, "Course is already Exists!!")

        if(user?.designation === 'admin' && user?.allAccess === 'true'){
            const response = await new courseDB({
                name: courseName,
                description: courseDescription,
                price: coursePrice,
                estimated_price: courseEstiPrice,
                tags: courseTagsList,
                categories: courseCategories,
                level: courseLevel,
                video_title: videoTitle,
                video_platform_url: videoURL,
                source_code_url: sourceCode,
                benefits: courseBenifit,
                faculty: facultyList,
                video_uploaded_url: courseVideo,
                course_logo_url: courselogo,
                admin_logs: user?.username
            }).save()
            .then(saveData =>{
                return this.sendSuccessResponse(res, true, "Course Added Successfully!!");
            })
        }
        else{
            return this.sendErrorResponse(res, false, "You are not Authorized !!")
        }
    })

}

export default CourseControllers;