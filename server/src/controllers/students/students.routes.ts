import express from "express";
import StudentsControllers from './modules/students.controllers'

const studentsRoutes = express.Router();
const INSTANCE_OF_STUDENTS = new StudentsControllers();

studentsRoutes.get('/getStudentsDeatils', INSTANCE_OF_STUDENTS.getStudentsDeatils);
studentsRoutes.post('/addStudents', INSTANCE_OF_STUDENTS.addStudents);
studentsRoutes.put('/editStudents', INSTANCE_OF_STUDENTS.editStudents); 

export default studentsRoutes;