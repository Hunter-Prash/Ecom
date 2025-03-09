import mongoose, { mongo } from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:0 // 0 for user, 1 for admin  or 0 for false, 1 for true
    }
},{timestamps:true})

export const userModel=mongoose.model('users',userSchema)
