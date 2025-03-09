import {userModel} from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


//REGISTER CONTROLLER
//POST /api/v1/auth/register
export const registerController = async (req, res) => {
    try{
        const {name,email,password,phone,address,role}=req.body;
        
        const exisitingUser=await userModel.findOne({email:email});
        if(exisitingUser){
            return res.status(400).json({'message':'User already exists'});
        }

      const newPassword=await bcrypt.hash(password,10);
      const newUser= new userModel({
        name,
        email,
        password:newPassword,
        phone,
        address,
        role
    })
    await newUser.save();
    res.status(201).json({'message':'User registered successfully'});
    }catch(err){
        res.status(500).json({'message':'Internal server error'});
    }
    
}


//LOGIN CONTROLLER
//POST /api/v1/auth/login
export const loginController = async (req, res) => {
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({'message':'Please enter all fields'});
        }
        const user=await userModel.findOne({email:email});

        //email not found
        if(!user){
            return res.status(400).json({'message':'User does not exist'});
        }

        //invalid password
        const match=await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(400).json({'message':'Invalid credentials'});
        }

        //generate token
        const token=await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        res.status(200).json({'token':token,
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,  
            }
        });
        

    }catch(err){
        res.status(500).json({'message':'Internal server error'});
    }
}

//test controller for protected route
export const testController = async (req, res) => {
    res.send('Protected route');
}