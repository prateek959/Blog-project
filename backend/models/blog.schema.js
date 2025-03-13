import mongoose from "mongoose";

const blogSchema =new mongoose.Schema({
    title: { type: String, required: true, },
    author: { type: String, required: true, },
    content: { type: String, required: true },
    image: { type: String, reuired: true, default:"" },
    views:{type:Number, default:0},
    likes:{type:[mongoose.Schema.Types.ObjectId],ref:'like'},
    status:{type:String, enum:["publish","draft", "scheduled"],default:"draft"},
    scheduleDate:{type:Date},
    commentsId:{type:[mongoose.Schema.Types.ObjectId],ref:'comment'},
},{ timestamps: true }
);

const Blog = mongoose.model('blog', blogSchema);
export { Blog };

