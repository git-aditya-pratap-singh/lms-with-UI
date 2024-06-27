import express from "express";
import ProfileControllers from "./modules/profile.controllers";
import CourseControllers from "./modules/course.controllers";
import TeachersControllers from "./modules/teachers.controllers";

import { upload } from '../../middlewares/multer.middleware';

const adminRoutes = express.Router();
const INSTANCE_OF_PROFILE = new ProfileControllers();
const INSTANCE_Of_COURSE = new CourseControllers();
const INSTANCE_OF_TEACHER = new TeachersControllers();

//-----------Routes -> Profile-------------------
adminRoutes.get('/getProfileDetails', INSTANCE_OF_PROFILE.getProfileDetails);
adminRoutes.put('/updateDetails', INSTANCE_OF_PROFILE.updateDetails);
adminRoutes.post('/uploadProfilePicture', upload.single("file"), INSTANCE_OF_PROFILE.uploadProfilePicture);

//-----------Routes -> course-------------------
adminRoutes.post('/addcourse', INSTANCE_Of_COURSE.addCourse);

//----------------Routes -> Teachers------------------
adminRoutes.get('/getTeachersDeatils', INSTANCE_OF_TEACHER.getTeachersDeatils);
adminRoutes.post('/addTeachers', INSTANCE_OF_TEACHER.addTeachers);
adminRoutes.post('/editTeachers', INSTANCE_OF_TEACHER.editTeachers);

export default adminRoutes;