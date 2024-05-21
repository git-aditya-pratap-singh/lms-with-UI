import express from 'express';
import LoginModels from './modules/login.model';

const authRouter = express.Router();

authRouter.post('/login', new LoginModels().Login);

export default authRouter;