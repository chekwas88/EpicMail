import express from 'express';
import MessageController from '../controllers/message';
import ValidateMessage from '../middleware/validateMessage';

const router = express.Router();

router.post(
  '/api/v1/messages',
  ValidateMessage.validateMessageData,
  MessageController.sendMessage,
);
export default router;
