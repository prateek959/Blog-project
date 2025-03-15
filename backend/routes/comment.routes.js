import express from 'express';
import { createComment, deleteComment, editComment } from '../controller/comment.controller.js';
import { checkToken } from '../middlewear/auth.middlewear.js';

const commentRouter = express.Router();

commentRouter.post('/create/:blogId',checkToken,createComment);
commentRouter.put('/update/:commentId',checkToken,editComment);
commentRouter.delete('/delete/:commentId',checkToken,deleteComment);

export default commentRouter;