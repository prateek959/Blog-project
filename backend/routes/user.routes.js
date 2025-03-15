import express from 'express';
import { forgotPassword, login, register, resetPassword } from '../controller/user.controller.js';

const userRouter = express.Router();

userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.post('/forgot_password',forgotPassword);
userRouter.post('/reset_password/:token',resetPassword);


export default userRouter;