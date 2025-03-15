import { Blog } from "../models/blog.schema.js";


const views = async (req, res, next) => {
    try {
        const blogId = req.params.blogId;

        const blog = await Blog.findById(blogId);

        blog.views += 1;
        await blog.save();

        next();

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export default views;