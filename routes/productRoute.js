import express from 'express';
import { isAdmin, requiredLogin } from '../middlewares/authMiddleware.js';
import { createProduct, getProducts, getSingleProduct ,getPhoto,deleteProduct, updateProduct, getProductCount, getProductsPerPage, searchProduct} from '../controllers/productController.js';
import formidable from 'express-formidable';
const router=express.Router();

router.post('/create',requiredLogin,isAdmin,formidable(),createProduct)
router.get('/get',requiredLogin,getProducts)
router.get('/getSingleProd/:pid',requiredLogin,getSingleProduct)

//get photo of product
router.get('/photo/:pid',getPhoto)//pid is product id

//delete product
router.delete('/delete/:pid',requiredLogin,isAdmin, deleteProduct)//pid is product id

//update product
router.put('/update/:pid',requiredLogin,isAdmin,formidable(),updateProduct)//pid is product id

//get product count
router.get('/product-count', getProductCount);

//get products per page
router.get('/productsPerPage/:page', getProductsPerPage);

//  search product
router.get('/search/:keyword',searchProduct);

export default router;