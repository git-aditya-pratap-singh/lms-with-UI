import express from 'express';
import CourseControllers from "./modules/course.controllers";
import upload from '../../middlewares/multer.middleware';

const coursesRoutes = express.Router();
const INSTANCE_Of_COURSE = new CourseControllers();

coursesRoutes.get('/getCourseList', INSTANCE_Of_COURSE.getCourseList);
coursesRoutes.post('/addcourse', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'video', maxCount: 1 }]), 
INSTANCE_Of_COURSE.addCourse);

export default coursesRoutes;