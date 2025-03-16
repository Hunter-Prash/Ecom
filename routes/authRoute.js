import express from 'express';
import {registerController, testController,forgotPasswordController} from '../controllers/authController.js';
import { loginController } from '../controllers/authController.js';
import { requiredLogin ,isAdmin} from '../middlewares/authMiddleware.js';
const router=express.Router();

//register
router.post('/register',registerController)

//login
router.post('/login',loginController)


//THIS IS DONE ONLY TO CHECK BACKEND ROUTES USING POSTMAN .IT IS NOT USED IN FRONTEND. We can use it in frontend via axios.get('/api/v1/auth/user-dashboard') and conditionally render the dashboard whether its of user or admin based on the response.
//But this is not done in frontend as we have used role based authentication in frontend.

// Protected route for users
router.get('/user-dashboard', requiredLogin, (req, res) => {
    res.json({ message: 'Welcome to the user dashboard' });
  });

  //THIS IS DONE ONLY TO CHECK BACKEND ROUTES USING POSTMAN.IT IS NOT USED IN FRONTEND
  // Protected route for admin
  router.get('/admin-dashboard', requiredLogin, isAdmin, (req, res) => {
    res.json({ message: 'Welcome to the admin dashboard' });
  });

//FORGOT PASSWORD
router.post('/forgotpassword',forgotPasswordController)


export default router;

