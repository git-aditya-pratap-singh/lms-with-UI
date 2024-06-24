import express from "express";
import ProfileControllers from "./modules/profile.controllers";
import CourseControllers from "./modules/course.controllers";
import { upload } from '../../middlewares/multer.middleware';

const adminRoutes = express.Router();
const INSTANCE_OF_PROFILE = new ProfileControllers();
const INSTANCE_Of_COURSE = new CourseControllers();

//-----------METHOD-> GET-------------------
adminRoutes.get('/getProfileDetails', INSTANCE_OF_PROFILE.getProfileDetails);

//-----------METHOD-> POST-------------------
adminRoutes.post('/uploadProfilePicture', upload.single("file"), INSTANCE_OF_PROFILE.uploadProfilePicture);
adminRoutes.post('/addcourse', INSTANCE_Of_COURSE.addCourse);

//-----------METHOD-> PUT-------------------
adminRoutes.put('/updateDetails', INSTANCE_OF_PROFILE.updateDetails);

export default adminRoutes;