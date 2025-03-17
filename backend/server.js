import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { db } from './config/db.js';
import cookieParser from 'cookie-parser';
import blogRouter from './routes/blog.routes.js';
import userRouter from './routes/user.routes.js';
import { testRouter } from './routes/test.routes.js';
import fileUpload from "express-fileupload";
import commentRouter from './routes/comment.routes.js';
import { likeRouter } from './routes/like.routes.js';
import readerRouter from './routes/reader.routes.js';
import adminRouter from './routes/admin.routes.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

app.get('/',(req, res)=>{
    res.send('Hello');
});

app.use('/blog',blogRouter);
app.use('/user',userRouter);
app.use('/test',testRouter);
app.use('/comment',commentRouter);
app.use('/like',likeRouter);
app.use('/read',readerRouter);
app.use('/admin',adminRouter);

const PORT = process.env.PORT || 4328;

app.listen(PORT,async ()=>{
    await db();
    console.log(`Server is running on ${PORT}`)
});