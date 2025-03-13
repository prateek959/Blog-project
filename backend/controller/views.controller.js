import { Blog } from "../models/blog.schema.js";

const views = async (req, res) => {
    try {
        const id = req.params.blogId;
        const blog = await Blog.findById(id);

        blog.views += 1;
        await blog.save();

        res.status(200).json(blog);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
};


export default views;