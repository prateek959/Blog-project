import express from 'express';
import { getPersonalBlog } from '../controller/blog.controller.js';
import { checkRole, checkToken } from '../middlewear/auth.middlewear.js';
import { checkimage } from '../controller/test.controller.js';
import sendMail from '../middlewear/nodemailer.middlewear.js';

const testRouter = express.Router();

testRouter.post('/check',checkToken,sendMail,(req, res)=>{
    res.send("Email send successfully");
});


export {testRouter};