import express from 'express';
import LoginController from './modules/login.model';

const loginRoutes = express.Router();
const LOGIN_INSTANCE = new LoginController();

loginRoutes.post('/login', LOGIN_INSTANCE.Login);
loginRoutes.post('/send-otp', LOGIN_INSTANCE.ForgetPswdSendOTPtoEmail);

export default loginRoutes;