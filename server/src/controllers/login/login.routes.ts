import express from 'express';
import LoginController from './modules/login.model';

const authRouter = express.Router();
const LOGIN_INSTANCE = new LoginController();

authRouter.post('/login', LOGIN_INSTANCE.Login);

export default authRouter;