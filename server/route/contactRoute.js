import express from 'express';
import contactController from '../controllers/contacts';
import Token from '../middleware/verifytoken';

const router = express.Router();
router.get(
  '/api/v1/contacts',
  Token.verifyToken,
  contactController.getContacts,
);

export default router;
