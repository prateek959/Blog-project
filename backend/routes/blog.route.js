import express from 'express';
import { createBlog, deleteBlog, draftBlog, getPersonalBlog, updateBlog } from '../controller/blog.controller.js';
import { checkRole, checkToken } from '../middlewear/auth.middlewear.js';

const blogRouter = express.Router();

blogRouter.post('/create',checkToken,checkRole('editor','admin'),createBlog);
blogRouter.get('/get',checkToken,checkRole('editor','admin'),getPersonalBlog);
blogRouter.put('/update/:id',checkToken,checkRole('editor','admin'),updateBlog);
blogRouter.delete('/delete/:id',checkToken,checkRole('editor','admin'),deleteBlog);
blogRouter.post('/draft/:blogId',checkToken,checkRole('admin','editor'),draftBlog);

export default blogRouter;