import express from 'express';
import LoginController from './modules/login.model';

const loginRoutes = express.Router();
const LOGIN_INSTANCE = new LoginController();

loginRoutes.post('/login', LOGIN_INSTANCE.Login);

loginRoutes.post('/send-otp', LOGIN_INSTANCE.ForgetPswdSendOTPtoEmail);
loginRoutes.post('/verified-otp', LOGIN_INSTANCE.ForgetPswdVerifiedOTP);
loginRoutes.post('/change-password', LOGIN_INSTANCE.ChangePassword)

export default loginRoutes;