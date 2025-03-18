import express from 'express';
import mongoose from 'mongoose';
import { Router } from 'express';
import { isAdmin, requiredLogin } from '../middlewares/authMiddleware.js';
import { categoryController,getCategories,updateController,getSingleCategory } from '../controllers/categoryController.js';

const router=express.Router();

//create category route
router.post('/create',requiredLogin,isAdmin,categoryController)

//update category route
router.put('/update/:id',requiredLogin,isAdmin,updateController)

//get all categories route
router.get('/getAllCategories',getCategories)

//get single category route
router.get('/getSingleCategory/:id',getSingleCategory)

export default router;