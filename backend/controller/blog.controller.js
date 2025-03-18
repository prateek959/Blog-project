import { Blog } from "../models/blog.schema.js";
import { v2 as cloudinary } from "cloudinary";
import { User } from "../models/user.schema.js";
import transporter from "../nodemailer/nodemailer.js";
import cron from 'node-cron'

cloudinary.config({
    cloud_name: `${process.env.CLOUD_NAME}`,
    api_key: `${process.env.CLOUD_KEY}`,
    api_secret: `${process.env.CLOUD_SECRET}`,
});

const createBlog = async (req, res) => {
    try {
        const { title, author, content, status } = req.body;
        console.log(req.body);
        let pic = req.body.image
        if (req.files && req.files.image) {
            const imageFile = req.files.image

            const uploadResult = await cloudinary.uploader.upload(imageFile.tempFilePath, {
                folder: "uploads",
            });
            pic = uploadResult.secure_url;
        };
        const user = await User.findOne({ email: req.user.email });
        const data = await Blog.create({
            userId: user._id,
            title,
            author,
            content,
            image: pic,
            status: status == "scheduled" ? "scheduled" : "publish"
        });

        const userData = await User.findOne({ email: req.user.email });
        userData.blogId.push(data.id);
        await userData.save();
        const mailOptions = {
            from: process.env.EMAIL,
            to: userData.email,
            subject: "🎉 Your Blog Has Been Published!",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #4CAF50;">✅ Blog Published Successfully!</h2>
                <p>Hi <strong>${userData.name || userData.email}</strong>,</p>
                <p>Your blog titled <strong>"${title}"</strong> has been published successfully on our platform. Here are the details:</p>
          
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                  <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Title</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${title}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Author</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${author}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Status</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">Published</td>
                  </tr>
                </table>
          
                ${pic ? `<div style="margin-top: 20px;"><img src="${pic}" alt="Blog Image" style="max-width: 100%; border-radius: 8px;"></div>` : ''}
          
                <p style="margin-top: 20px;">You can view or edit your blog anytime from your dashboard.</p>
          
                <p style="margin-top: 30px;">Cheers,<br/>The Blog Team 🚀</p>
              </div>
            `
        };

        if (status == "scheduled") {
            let { date, hour, minutes } = req.body;
            const now = new Date();
            if (date === "") date = now.getDate();
            if (hour === "") hour = now.getHours();
            if (minutes === "") minutes = now.getMinutes();

            cron.schedule("* * * * *", () => {
                const current = new Date();
                
                if (
                    current.getDate() == date &&
                    current.getHours() == hour &&
                    current.getMinutes() == minutes
                ) {
                    transporter.sendMail(mailOptions);
                    data.status = "publish"
                    data.save();
                }
            });
            return res.status(201).json({ msg: "Blog scheduled successfully" });
        };
        console.log("publish")
        await transporter.sendMail(mailOptions);
        res.status(201).json({ msg: "Blog created successfully", data });

    } catch (error) {
        console.log(error.stack);
        res.status(400).json({ msg: "Internal server error" });
    }
};

const getPersonalBlog = async (req, res) => {
    try {

        const user = await User.findOne({ email: req.user.email }).populate('blogId');

        const blogs = user.blogId;

        res.status(200).json(blogs);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
};


const updateBlog = async (req, res) => {
    try {
        const { title, author, content, status } = req.body;
        const id = req.params.id;
        const blog = await Blog.findById(id);
        const user = await User.findOne({ email: req.user.email });

        if (!user.blogId.includes(id)) {
            return res.status(400).json({ msg: "Unauthorized access" });
        }

        if (title) {
            blog.title = title;
        }

        if (content) {
            blog.content = content;
        }

        if (author) {
            blog.author = author;
        }

        if (status) {
            blog.status = status;
        }

        await blog.save();
        res.status(200).json({ msg: "Update successfully" });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ email: req.user.email });

        if (!user.blogId.includes(id)) {
            return res.status(400).json({ msg: "Unauthorized access" });
        }
        const blog = await Blog.findById(id);

        user.blogId = user.blogId.filter((elem) => blog._id.toString() !== elem.toString());
        await user.save();
        await blog.deleteOne();
        res.status(200).json({ msg: "Delete successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
};


const draftBlog = async (req, res) => {
    try {
        const id = req.params.blogId;
        const blog = await Blog.findById(id);
        const user = await User.findOne({ email: req.user.email });

        if (blog.status === "publish") {
            return res.status(200).json(blog);
        }

        if (user._id == blog._id) {
            return res.status(200).json(blog);
        }

        res.status(400).json({ msg: "Unathorized access" });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
};


export { createBlog, getPersonalBlog, updateBlog, deleteBlog, draftBlog };