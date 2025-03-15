import { Blog } from "../models/blog.schema.js";


const getBlog = async (req, res) => {
    try {
        const data = await Blog.find({ status: "publish" }).populate('likes').populate('commentsId');

        res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
};

const getBlogbyId = async (req, res) => {
    try {
        const blogId = req.params.blogId
        const data = await Blog.find({ status: "publish", _id: blogId }).populate('likes').populate('commentsId');

        res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
}

export { getBlog, getBlogbyId };
