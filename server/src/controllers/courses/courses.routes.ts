import express from 'express';
import CourseControllers from "./modules/course.controllers";

const coursesRoutes = express.Router();
const INSTANCE_Of_COURSE = new CourseControllers();

coursesRoutes.get('/getCourseList', INSTANCE_Of_COURSE.getCourseList);
coursesRoutes.post('/addcourse', INSTANCE_Of_COURSE.addCourse);

export default coursesRoutes;