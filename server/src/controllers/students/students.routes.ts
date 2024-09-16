import express from "express";
import StudentsControllers from './modules/students.controllers';
import StudentTempControllers from "./modules/studentsTemp.controllers";

const studentsRoutes = express.Router();
const INSTANCE_OF_STUDENTS = new StudentsControllers();

studentsRoutes.get('/getStudentsDeatils', INSTANCE_OF_STUDENTS.getStudentsDeatils);
studentsRoutes.get('/downloadExcelSheet', INSTANCE_OF_STUDENTS.downloadExcelSheet);
studentsRoutes.post('/addStudents', INSTANCE_OF_STUDENTS.addStudents);
studentsRoutes.put('/editStudents', INSTANCE_OF_STUDENTS.editStudents); 

//--------Temp-Student-Routes------------
studentsRoutes.get('/tempstudentsList', new StudentTempControllers().getTempStudentsList);


export default studentsRoutes;