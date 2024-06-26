import express from 'express';
import loginRoutes from '../controllers/login/login.routes';
import dashboardRoutes from '../controllers/controllers.routes';

import UserAuthentication from '../middlewares/auth.middleware';

const AUTH_VERIFICATION = new UserAuthentication();
const authRouter = express.Router();

authRouter.use('/dashboard', AUTH_VERIFICATION.verifyToken, dashboardRoutes);
authRouter.use('/login', loginRoutes)

export default authRouter;