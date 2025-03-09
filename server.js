import express from 'express';
const app=express();
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import dbConnect from './config/db_config.js';
import authRoutes from './routes/authRoute.js';

app.use(cors())

app.use(express.urlencoded({extended:true}));
app.use(express.json());

dbConnect();
app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.use('/api/v1/auth',authRoutes);

app.listen(process.env.PORT,()=>{    
    console.log(`Server is running on port ${process.env.PORT}`);
})