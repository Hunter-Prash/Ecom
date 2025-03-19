import express from 'express';
import { isAdmin, requiredLogin } from '../middlewares/authMiddleware.js';
import { createProduct } from '../controllers/productController.js';
import formidable from 'express-formidable';
const router=express.Router();

router.post('/create',requiredLogin,isAdmin,formidable(),createProduct)


export default router;