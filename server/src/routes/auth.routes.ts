import express from 'express';
import authRoutes from '../controllers/login/login.routes';
import adminRoutes from '../controllers/admin/admin.routes';
import userRoutes from '../controllers/users/user.routes';

import UserAuthentication from '../middlewares/auth.middleware';

const router = express.Router();
const AUTH_TOKEN_VERIFICATION = new UserAuthentication();

router.use('/login', authRoutes);
router.use('/admin', AUTH_TOKEN_VERIFICATION.verifyToken, adminRoutes);
router.use('/user', AUTH_TOKEN_VERIFICATION.verifyToken, userRoutes);

export default router;