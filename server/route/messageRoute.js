import express from 'express';
import MessageController from '../controllers/message';
import ValidateMessage from '../middleware/validateMessage';
import Token from '../middleware/verifytoken';
// import helper from '../utils/helper';

const router = express.Router();

router.post(
  '/api/v1/messages',
  ValidateMessage.validateMessageData,
  Token.verifyToken,
  MessageController.sendMessage,
);

router.get(
  '/api/v1/messages',
  Token.verifyToken,
  MessageController.getReceivedMessages,
);

router.get(
  '/api/v1/messages/unread',
  Token.verifyToken,
  MessageController.getUnreadMessages,
);

router.get(
  '/api/v1/messages/sent',
  Token.verifyToken,
  MessageController.getSentMessages,
);

router.get(
  '/api/v1/messages/:id',
  Token.verifyToken,
  MessageController.getAMessage,
);


export default router;
