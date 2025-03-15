import { Blog } from "../models/blog.schema.js";
import Comments from "../models/comment.schema.js";
import { User } from "../models/user.schema.js";


const createComment = async (req, res) => {
    try {
        const { text } = req.body;
        const id = req.params.blogId;
        const user = await User.findOne({ email: req.user.email });

        const blog = await Blog.findById(id);

        const data = await Comments.create({
            userId: user.id,
            blogId:blog._id,
            text
        });

        blog.commentsId.push(data.id);
        await blog.save();
        res.status(200).json({ msg: "Comment ok" });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
};

const editComment = async (req, res) => {
    try {
        const id = req.params.commentId;
        const { text } = req.body;
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        const comment = await Comments.findById(id);

        if (!comment) {
            return res.status(400).json({ msg: "Comment is not found" });
        }
       
        if (comment.userId.toString() !== user._id.toString()) {
            return res.status(400).json({ msg: "Update failed" });
        };

        comment.text = text;
        await comment.save();

        res.status(200).json({ msg: "Comment updated successfully" });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
}

const deleteComment = async (req, res) => {
    try {
        const id = req.params.commentId;
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" })
        }

        const comment = await Comments.findById(id);

        if (!comment) {
            return res.status(400).json({ msg: "Comment not found" });
        }

        const blog = await Blog.findById(comment.blogId);;
        if (!blog) {
            return res.status(400).json({ msg: "Blog not found" })
        }

        if(user._id.toString() !== comment.userId.toString()){
            return res.status(400).json({msg:"Comment is not deleted"});
        };

        blog.commentsId = blog.commentsId.filter((elem) => elem.toString() !== comment._id.toString());
        await blog.save();
        await comment.save();
        await comment.deleteOne();
        res.status(200).json({ msg: "Comment deleted successfully" });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
}

export { createComment, deleteComment, editComment };