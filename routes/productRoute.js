import express from 'express';
import { isAdmin, requiredLogin } from '../middlewares/authMiddleware.js';
import { createProduct, getProducts, getSingleProduct } from '../controllers/productController.js';
import formidable from 'express-formidable';
const router=express.Router();

router.post('/create',requiredLogin,isAdmin,formidable(),createProduct)
router.get('/get',getProducts)
router.get('/getSingleProd/:slug',getSingleProduct)
export default router;