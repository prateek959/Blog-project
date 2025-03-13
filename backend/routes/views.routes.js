import express from 'express';
import { checkToken } from '../middlewear/auth.middlewear.js';
import views from '../controller/views.controller.js';

const viewsRouter = express.Router();

viewsRouter.post('/:blogId',checkToken,views);

export default viewsRouter;