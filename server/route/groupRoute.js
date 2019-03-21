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

router.get(
  '/api/v1/groups',
  Token.verifyToken,
  GroupController.getAllgroups,
);

router.post(
  '/api/v1/groups/:id/users',
  Token.verifyToken,
  ValidateGroup.ValidateMemberemail,
  GroupController.addMemberToGroup,
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
