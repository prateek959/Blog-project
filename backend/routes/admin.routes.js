import express from 'express';
import { deleteBlogAdmin, editBlogAdmin, getAllBlogs } from '../controller/admin.controller.js';
import { checkRole, checkToken } from '../middlewear/auth.middlewear.js';
import { createBlog } from '../controller/blog.controller.js';

const adminRouter = express.Router();

adminRouter.get('/get',checkToken,checkRole('admin'),getAllBlogs);
adminRouter.put('/update/:blogId',checkToken,checkRole('admin'),editBlogAdmin);
adminRouter.delete('/delete/:blogId',checkToken,checkRole('admin'),deleteBlogAdmin);

export default adminRouter;