import { User } from "../models/user.schema.js";
import argon from 'argon2';
import jwt from 'jsonwebtoken';


const register = async (req, res)=>{
    try {
        const {name, email, password, role} = req.body;

        let user = await User.findOne({email});

        if(user){
         return res.status(400).json({msg:"User is already register"});
        }

        const hashPass = await argon.hash(password);

        user = User.create({
            name,
            email,
            password:hashPass,
            role
        });

        res.status(201).json({msg:"user register successfully"});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg:"Internal server error"});
    }
};


const login = async(req, res)=>{
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({msg:"Email is invalid"});
        }

        const verify = await argon.verify(user.password, password);

        if(!verify){
            return res.status(400).json({msg:"Password is invalid"});
        }

        const accessToken = jwt.sign({email:email,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:'1h'});

        const refreshToken = jwt.sign({email:email,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:'7d'});

        res.cookie('accessToken',accessToken,{ maxAge: 60 * 60 * 1000,});
        res.cookie('refreshToken',refreshToken,{ maxAge: 7 * 24 * 60 * 60 * 1000,});
    
        res.status(200).json({msg:"Login successfully"});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg:"Internal server error"});
    }
};

export {register, login};