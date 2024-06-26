import express from "express";
import ProfileControllers from "./modules/profile.controllers";
import CourseControllers from "./modules/course.controllers";
import TeachersControllers from "./modules/teachers.controllers";

import { upload } from '../../middlewares/multer.middleware';

const adminRoutes = express.Router();
const INSTANCE_OF_PROFILE = new ProfileControllers();
const INSTANCE_Of_COURSE = new CourseControllers();
const INSTANCE_OF_TEACHER = new TeachersControllers();

//-----------METHOD-> GET-------------------
adminRoutes.get('/getProfileDetails', INSTANCE_OF_PROFILE.getProfileDetails);
adminRoutes.get('/getProfileDetails', INSTANCE_OF_PROFILE.getProfileDetails);getTeachersDeatils

//-----------METHOD-> POST-------------------
adminRoutes.post('/uploadProfilePicture', upload.single("file"), INSTANCE_OF_PROFILE.uploadProfilePicture);
adminRoutes.post('/addcourse', INSTANCE_Of_COURSE.addCourse);
adminRoutes.post('/addTeachers', INSTANCE_OF_TEACHER.addTeachers);
adminRoutes.post('/editTeachers', INSTANCE_OF_TEACHER.editTeachers);

//-----------METHOD-> PUT-------------------
adminRoutes.put('/updateDetails', INSTANCE_OF_PROFILE.updateDetails);

export default adminRoutes;