import express from 'express';
import { addLike } from '../controller/like.controller.js';
import { checkToken } from '../middlewear/auth.middlewear.js';

const likeRouter = express.Router();

likeRouter.post('/add/:blogId',checkToken,addLike);

export {likeRouter};