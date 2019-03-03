import express from 'express';
import userController from '../controllers/users';
import validate from '../middleware/validate';

const router = express.Router();

router.post(
  '/api/v1/auth/signup',
  validate.validateUserRegData,
  userController.registerUser,
);

export default router;
