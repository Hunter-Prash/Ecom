import express from 'express';
import { isAdmin, requiredLogin } from '../middlewares/authMiddleware.js';
import { categoryController,getCategories,updateController,getSingleCategory ,deleteController} from '../controllers/categoryController.js';

const router=express.Router();

//create category route
router.post('/create',requiredLogin,isAdmin,categoryController)

//update category route
router.put('/update/:id',requiredLogin,isAdmin,updateController)

//get all categories route
router.get('/getAllCategories',requiredLogin,getCategories)

//get single category route
router.get('/getSingleCategory/:id',requiredLogin,isAdmin,getSingleCategory)

//delete category route
router.delete('/delete/:id',requiredLogin,isAdmin,deleteController)

export default router;