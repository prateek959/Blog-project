import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    blogId:{type:mongoose.Schema.Types.ObjectId, ref:'blog'},
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Comments = mongoose.model('comment', commentSchema);

export default  Comments ;