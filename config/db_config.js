import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const dbConnect=async(req,res)=>{
    try{
        const conn=await mongoose.connect('mongodb+srv://rajajiprashant:dhhlpJtklZ3UA8jL@cluster0.qee2u.mongodb.net/Ecommerce');
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(err){
        console.log(err);
    }
}
export default dbConnect;