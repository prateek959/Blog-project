import { Blog } from "../models/blog.schema.js";
import Like from "../models/like.schema.js";
import { User } from "../models/user.schema.js";


const addLike = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findById(id).populate('likes');
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        let existingLike  = await Like.findOne({ userId: user.id });

        if (existingLike ) {
            await existingLike.deleteOne({_id:existingLike.id});
            blog.likes = blog.likes.filter((elem) => elem.userId.toString() !== user.id.toString());
            await blog.save();
            return res.status(200).json({ msg: "Like remove successfully" });
        }
        const like = await Like.create({
            userId: user.id
        });
        blog.likes.push(await like.id);
        await blog.save();

        res.status(200).json({ msg: "Like successfully" });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export { addLike }