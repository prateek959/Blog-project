import express from 'express';
import { getBlog, getBlogbyId } from '../controller/reader.controller.js';
import { checkToken } from '../middlewear/auth.middlewear.js';
import views from '../middlewear/views.middlewear.js';

const readerRouter = express.Router();

readerRouter.get('/get',getBlog)
readerRouter.get('/get_blog/:blogId',checkToken,views,getBlogbyId);

export default readerRouter;