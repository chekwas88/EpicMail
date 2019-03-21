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
  ValidateGroup.ValidateMemberemail,
  GroupController.addMemberToGroup,
);

export default router;
