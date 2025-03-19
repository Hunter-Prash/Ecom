import express from 'express';
const app=express();
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import dbConnect from './config/db_config.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import productRoutes from './routes/productRoute.js';

app.use(cors())

app.use(express.urlencoded({extended:true}));
app.use(express.json());

dbConnect();
app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/products',productRoutes);

app.listen(process.env.PORT,()=>{    
    console.log(`Server is running on port ${process.env.PORT}`);
})