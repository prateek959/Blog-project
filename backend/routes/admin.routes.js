import express from 'express';
import { deleteBlogAdmin, editBlogAdmin, getAllBlogs } from '../controller/admin.controller.js';
import { checkRole, checkToken } from '../middlewear/auth.middlewear.js';
import { updateBlog } from '../controller/blog.controller.js';

const adminRouter = express.Router();

adminRouter.get('/get',checkToken,checkRole('admin'),getAllBlogs);
adminRouter.post('/:blogId',checkToken,checkRole('admin'),editBlogAdmin);
adminRouter.put('/update/:blogId',checkToken,checkRole('admin'),updateBlog);
adminRouter.delete('/:blogId',checkToken,checkRole('admin'),deleteBlogAdmin);


export default adminRouter;