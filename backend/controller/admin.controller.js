import { Blog } from "../models/blog.schema.js";
import { User } from "../models/user.schema.js";


const editBlogAdmin = async (req, res) => {
  try {
    const id = req.params.blogId;
    const { title, author, content } = req.body;
    const blog = await Blog.findById(id);

    if (title) {
      blog.title = title
    };

    if (author) {
      blog.author = author;
    }

    if (content) {
      blog.content = content;
    }

    await blog.save();

    res.status(200).json({ msg: "Blog update successfully" });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const deleteBlogAdmin = async (req, res) => {
  try {
    const id = req.params.blogId;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(400).json({ msg: "Blog is not found" });
    }

    const user = await User.findById(blog.userId);

    if (!user) {
      return res.status(400).json({ msg: "User is not found" });
    }

    user.blogId = user.blogId.filter((elem) => elem.toString() !== blog._id.toString());
    await blog.deleteOne();
    await user.save();

    res.status(200).json({ msg: "Blog delete successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};


const getAllBlogs = async (req, res) => {
  try {
    const blog = await Blog.find( {status: { $in: ["publish", "scheduled"] }}).populate('likes').populate('commentsId');
    res.status(200).json(blog);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};


export { editBlogAdmin, deleteBlogAdmin, getAllBlogs };