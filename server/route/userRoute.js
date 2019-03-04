import express from 'express';
import userController from '../controllers/users';
import validateUser from '../middleware/validateUser';

const router = express.Router();

router.post(
  '/api/v1/auth/signup',
  validateUser.validateUserRegData,
  validateUser.validateUserRegPassword,
  userController.registerUser,
);

router.post(
  '/api/v1/auth/login',
  validateUser.validateUserLoginData,
  validateUser.validateLogin,
  userController.loginUser,
);

export default router;
