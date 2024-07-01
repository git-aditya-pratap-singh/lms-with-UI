import express from "express";
import TeachersControllers from './modules/teachers.controllers';

const teachersRoutes = express.Router();
const INSTANCE_OF_TEACHER = new TeachersControllers();

teachersRoutes.get('/getTeachersDeatils', INSTANCE_OF_TEACHER.getTeachersDeatils);
teachersRoutes.get('/getCourseTeachersDeatils', INSTANCE_OF_TEACHER.getCourseTeachersDeatils);
teachersRoutes.post('/addTeachers', INSTANCE_OF_TEACHER.addTeachers);
teachersRoutes.put('/editTeachers', INSTANCE_OF_TEACHER.editTeachers); 

export default teachersRoutes;