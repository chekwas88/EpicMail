import express from 'express';
import GroupController from '../controllers/groups';
import ValidateGroup from '../middleware/ValidateGroup';
import Token from '../middleware/verifytoken';

const router = express.Router();
router.post(
  '/api/v1/groups',
  Token.verifyToken,
  ValidateGroup.ValidateGroupData,
  GroupController.createGroup,
);

router.post(
  '/api/v1/groups/:id/users',
  Token.verifyToken,
  ValidateGroup.validateGroupMember,
  GroupController.addMemberToGroup,
);

router.post(
  '/api/v1/groups/:groupid/messages',
  Token.verifyToken,
  ValidateGroup.validateMessageData,
  GroupController.sendMessageToGroup,
);

router.patch(
  '/api/v1/groups/:id/name',
  Token.verifyToken,
  ValidateGroup.ValidateGroupData,
  GroupController.updateGroup,
);

router.delete(
  '/api/v1/groups/:id',
  Token.verifyToken,
  GroupController.deleteGroup,
);

router.delete(
  '/api/v1/groups/:groupid/users/:id',
  Token.verifyToken,
  GroupController.deleteGroupMember,
);

export default router;
