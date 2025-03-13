import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String},
    role:{type:String, enum:["admin","editor"], default:"editor"},
    blogId:{type:[mongoose.Schema.Types.ObjectId],ref:"blog"}
});

const User = mongoose.model('user',userSchema);

export {User};