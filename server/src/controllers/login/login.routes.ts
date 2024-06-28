import express from 'express';
import LoginController from './modules/login.model';

const loginRoutes = express.Router();
const LOGIN_INSTANCE = new LoginController();

loginRoutes.post('/login', LOGIN_INSTANCE.Login);

export default loginRoutes;