import express from 'express';
import { createComment, deleteComment, editComment } from '../controller/comment.controller.js';
import { checkToken } from '../middlewear/auth.middlewear.js';

const commentRouter = express.Router();

commentRouter.post('/create/:blogId',checkToken,createComment);
commentRouter.post('/update/:commentId',checkToken,editComment);
commentRouter.post('/delete/:blogId',checkToken,deleteComment);

export default commentRouter;