import express from 'express';
import loginRoutes from '../controllers/login/login.routes';
import dashboardRoutes from '../controllers/controllers.routes';
import FetchCourseList from '../controllers/courses/modules/fetchCourseofRegis.controllers';
import StudentTempControllers from '../controllers/students/modules/studentsTemp.controllers';

import UserAuthentication from '../middlewares/auth.middleware';

const AUTH_VERIFICATION = new UserAuthentication();
const authRouter = express.Router();

authRouter.use('/dashboard', AUTH_VERIFICATION.verifyToken, dashboardRoutes);
authRouter.use('/login', loginRoutes);
authRouter.use('/forget-password', loginRoutes);

authRouter.get('/fetchcourseOfregistration/getCourseList', new FetchCourseList().getCourseList);
authRouter.post('/add-temp-student-verify', new StudentTempControllers().StudentAddTempOTP);
authRouter.post('/add-temp-student', new StudentTempControllers().TempStudentAdd);



export default authRouter;