import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import {userModel} from '../models/userModel.js';
import mongoose from 'mongoose';

//protected route middleware
export const requiredLogin=async (req,res,next)=>{
    try{
        const token=req.headers['authorization'];
        const decoded=JWT.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        
        next();

    }catch(err){
        console.log(err);
        res.status(401).json({error:'Unauthorized access'});
    }
}

//ADMIN ACCESS MIDDLEWARE
export const isAdmin=async(req,res,next)=>{
    try{
        
        const user=await userModel.findById(req.user._id)
        if(!user){
            return res.status(400).json({message:'user does not exist'})
        }

        if(user.role!==1){
            return res.status(400).json({
                message:'user is not admin'
            })
        }
        else{
            next()
        }
    }catch(err){
        console.error(err)
        res.status(400).json({message:'error in admin middleware'})
    }
}