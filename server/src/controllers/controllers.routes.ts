import express from 'express';
import dashboardHomeRoutes from './dashboard/dashboard.routes';
import profilesRoutes from './profiles/profiles.routes';
import studentsRoutes from './students/students.routes';
import teachersRoutes from './teachers/teachers.routes';
import coursesRoutes from './courses/courses.routes';

const dashboardRoutes = express.Router();

dashboardRoutes.use('/home', dashboardHomeRoutes);
dashboardRoutes.use('/profiles', profilesRoutes);
dashboardRoutes.use('/teachers', teachersRoutes);
dashboardRoutes.use('/students', studentsRoutes);
dashboardRoutes.use('/courses', coursesRoutes);

export default dashboardRoutes;