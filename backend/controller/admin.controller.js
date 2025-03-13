import { Blog } from "../models/blog.schema.js";


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

    console.log(blog);
    res.send('done');

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};


const getAllBlogs = async (req, res) => {
  try {
    const blog = await Blog.find({}).populate('likes').populate('commentsId');
    res.status(200).json(blog);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const updateBlogs = async(req, res)=>{
  try {
    const id = req.params.blogId;
    const blog = await Blog.findById(id);
    const {title, author, content, status} = req.body;

    if(title){
      blog.title = title;
    }

    if(author){
      blog.author = author;
    }

    if(content){
      blog.content = content;
    }

    if(status){
      blog.status = status;
    }

    res.status(200).json({msg:"Update successfully"});

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
}


export { editBlogAdmin, deleteBlogAdmin, getAllBlogs, updateBlogs };