import express from 'express';
import { isAdmin, requiredLogin } from '../middlewares/authMiddleware.js';
import { createProduct, getProducts, getSingleProduct ,getPhoto,deleteProduct, updateProduct} from '../controllers/productController.js';
import formidable from 'express-formidable';
const router=express.Router();

router.post('/create',requiredLogin,isAdmin,formidable(),createProduct)
router.get('/get',getProducts)
router.get('/getSingleProd/:pid',getSingleProduct)

//get photo of product
router.get('/photo/:pid',getPhoto)//pid is product id

//delete product
router.delete('/delete/:pid', deleteProduct)//pid is product id

//update product
router.put('/update/:pid',requiredLogin,isAdmin,formidable(),updateProduct)//pid is product id

export default router;