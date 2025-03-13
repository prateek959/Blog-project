import express from 'express';
import { getBlog } from '../controller/reader.controller.js';
import { checkToken } from '../middlewear/auth.middlewear.js';

const readerRouter = express.Router();

readerRouter.get('/get',checkToken,getBlog);

export default readerRouter;