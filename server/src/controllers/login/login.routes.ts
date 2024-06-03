import express from 'express';
import LoginController from './modules/login.model';

const authRoutes = express.Router();
const LOGIN_INSTANCE = new LoginController();

authRoutes.post('/login', LOGIN_INSTANCE.Login);

export default authRoutes;