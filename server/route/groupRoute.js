import express from 'express';
import GroupController from '../controllers/groups';
import validate from '../middleware/validateMessage';
import ValidateGroup from '../middleware/ValidateGroup';
import Token from '../middleware/verifytoken';

const router = express.Router();
router.post(
  '/api/v1/groups',
  Token.verifyToken,
  ValidateGroup.ValidateGroupData,
  GroupController.createGroup,
);

router.get(
  '/api/v1/groups',
  Token.verifyToken,
  GroupController.getAllgroups,
);

router.post(
  '/api/v1/groups/:id/users',
  Token.verifyToken,
  validate.validateIdparams,
  ValidateGroup.validateGroupMember,
  GroupController.addMemberToGroupByEmail,
);

router.post(
  '/api/v1/groups/:groupid/users/:id',
  Token.verifyToken,
  validate.validateIdparams,
  validate.validategroupId,
  GroupController.addMemberToGroupById,
);

router.get(
  '/api/v1/groups/:id/users',
  Token.verifyToken,
  validate.validateIdparams,
  GroupController.getAllgroupUsers,
);

router.post(
  '/api/v1/groups/:groupid/messages',
  Token.verifyToken,
  validate.validategroupId,
  ValidateGroup.validateMessageData,
  GroupController.sendMessageToGroup,
);

router.patch(
  '/api/v1/groups/:id/name',
  Token.verifyToken,
  validate.validateIdparams,
  ValidateGroup.ValidateGroupData,
  GroupController.updateGroup,
);

router.delete(
  '/api/v1/groups/:id',
  Token.verifyToken,
  validate.validateIdparams,
  GroupController.deleteGroup,
);

router.delete(
  '/api/v1/groups/:groupid/users/:id',
  Token.verifyToken,
  validate.validategroupId,
  validate.validateIdparams,
  GroupController.deleteGroupMember,
);

export default router;
