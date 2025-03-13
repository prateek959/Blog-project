import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    port:587,
    secure:true,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS
    }
});

export default transporter;