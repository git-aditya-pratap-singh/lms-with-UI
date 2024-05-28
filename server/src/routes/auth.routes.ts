import express from 'express';
import authRouter from '../controllers/login/login.routes';

const router = express.Router();

router.use('/login', authRouter);
//router.use('/admin', '');
//router.use('/user', '');

export default router;