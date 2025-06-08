import mongoose from "mongoose";

const blogSchema =new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
    title: { type: String, required: true, },
    author: { type: String, required: true, },
    content: { type: String, required: true },
    image: { type: String, required: true, default:"" },
    views:{type:Number, default:0},
    likes:{type:[mongoose.Schema.Types.ObjectId],ref:'like'},
    status:{type:String, enum:["publish","draft", "scheduled"],default:"draft"},
    commentsId:{type:[mongoose.Schema.Types.ObjectId],ref:'comment'},
},{ timestamps: true }
);

const Blog = mongoose.model('blog', blogSchema);
export { Blog };

