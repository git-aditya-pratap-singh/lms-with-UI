import { Request, Response } from "express";
import AlertService from "../../../helpers/AlertService";
import asyncHandler from "../../../utils/asyncHandler";

import studentsDB from "../../../models/students.schema";
import teachersDB from '../../../models/teachers.schema'; 
import courseDB from '../../../models/course.schema';

class DashboardHome extends AlertService {

    public fetchHomedetails = asyncHandler(async(req: Request, res: Response): Promise<any>=>{
       
        //4. array prepare wise {'sep': 23} for student, teachers
        const totalStudents = await studentsDB.find().countDocuments();
        const totalTeachers = await teachersDB.find().countDocuments();
        const totalCourses = await courseDB.find().countDocuments();

        const resultResponse = {
            totalStudent: totalStudents,
            totalTeacher: totalTeachers,
            totalCourse: totalCourses
        }
        console.log(resultResponse);

        const monthYear = ['January', 'February', 'March', 'April', 'May', 
            'June', 'July', 'August', 'September', 'October', 'Novembe', 'December']

        // const data = monthYear.map((items)=>{
        //     studentsDB.aggregate([
        //         {
        //           $match: {
        //             registrationDate: {$eq: items}
        //           }
        //         },
        //         {
        //           $group: {
        //             totalStudentssss: { $sum: 1 }
        //           }
        //         }
        //       ]);
        // });

        // console.log(data)
        return this.sendSuccessResponse(res, true, "Details fetched!!", resultResponse);


    });

}
export default DashboardHome;