import {NextFunction, Request, Response} from 'express';
import {ObjectId} from 'mongodb';
import fs from 'fs';
import mongoose from 'mongoose';
import AlertService from '../../../helpers/AlertService';
import asyncHandler from '../../../utils/asyncHandler';
import { uploadOnCloudinary } from '../../../utils/cloudinary';
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

    public getCourseList = asyncHandler(async(req: Request, res: Response): Promise<any>=>{
        const response = await courseDB.find({
            status: {$ne: "Disabled"}
        },{
            _id: 1,
            name: 1
        })
        return this.sendSuccessResponse(res, true, "Course fetched!!", response);
    })
 
    public addCourse = asyncHandler( async(req: Request, res: Response, next: NextFunction, session?: mongoose.ClientSession): Promise<any> =>{

        const user = req?.user;  // store login user information
        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };

        if (!req.files || !files.video || !files.logo)
            return this.sendErrorResponse(res, false, "Both video and image files are required !!")
        // to get image and video path
        const videoPath = files.video ? files.video[0]?.path : null;  
        const logoPath = files.logo ? files.logo[0]?.path : null;

        try {
            // image and video upload on cloudinary services
            const cloudinaryPaths = await Promise.all([videoPath, logoPath].map(async (path: string | null) => {
                if (!path) return null;
                const cloudinaryFile = await uploadOnCloudinary(path);
                if (!cloudinaryFile)
                    return this.sendErrorResponse(res, false, "Image or Video hasn't uploaded on Cloudinary!!");
                fs.unlinkSync(path); // Remove the file after uploading
                return cloudinaryFile?.url;
            }));
       
            const {courseName, courseDescription, coursePrice, courseEstiPrice, courseTags, courseCategories, courseLevel,
                videoTitle, videoURL, sourceCode, courseBenifit, faculity, courseVideo, courselogo} = req.body;
         
            const courseTagsList: ObjectId[] = courseTags.map((tags: any) => new ObjectId(tags.value));
            const facultyList: ObjectId[] = faculity.map((faculty: any) => new ObjectId(faculty.value));

            if(!await this.IsCourseExists(courseName, res))
                return this.sendErrorResponse(res, false, "Course is already Exists!!")

            if(user?.designation === 'admin' && user?.allAccess === 'true'){
                const newCourse = new courseDB({
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
                    video_uploaded_url: cloudinaryPaths[0],
                    course_logo_url: cloudinaryPaths[1],
                    admin_logs: user?.username
                });
                await newCourse.save({ session });
                return this.sendSuccessResponse(res, true, "Course Added Successfully!!");
            }else
                return this.sendErrorResponse(res, false, "You are not Authorized !!")
            
        } catch (error){
            return this.sendErrorResponse(res, false, "Error uploading files.");
        } 
    });
}

export default CourseControllers;