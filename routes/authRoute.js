import express from 'express';
import {registerController, testController} from '../controllers/authController.js';
import { loginController } from '../controllers/authController.js';
import { requiredLogin ,isAdmin} from '../middlewares/authMiddleware.js';
const router=express.Router();

//register
router.post('/register',registerController)

//login
router.post('/login',loginController)

//protected routes
router.get('/protected',requiredLogin,isAdmin,testController)


export default router;

