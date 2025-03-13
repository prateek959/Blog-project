import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
},{timestamps:true});

const Like = mongoose.model('like',likeSchema);

export default Like;