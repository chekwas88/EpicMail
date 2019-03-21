'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _groups = require('../controllers/groups');

var _groups2 = _interopRequireDefault(_groups);

var _ValidateGroup = require('../middleware/ValidateGroup');

var _ValidateGroup2 = _interopRequireDefault(_ValidateGroup);

var _verifytoken = require('../middleware/verifytoken');

var _verifytoken2 = _interopRequireDefault(_verifytoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();
router.post('/api/v1/groups', _verifytoken2.default.verifyToken, _ValidateGroup2.default.ValidateGroupData, _groups2.default.createGroup);

router.get('/api/v1/groups', _verifytoken2.default.verifyToken, _groups2.default.getAllgroups);

router.post('/api/v1/groups/:id/users', _verifytoken2.default.verifyToken, _ValidateGroup2.default.validateGroupMember, _groups2.default.addMemberToGroup);

router.post('/api/v1/groups/:groupid/messages', _verifytoken2.default.verifyToken, _ValidateGroup2.default.validateMessageData, _groups2.default.sendMessageToGroup);

router.patch('/api/v1/groups/:id/name', _verifytoken2.default.verifyToken, _ValidateGroup2.default.ValidateGroupData, _groups2.default.updateGroup);

router.delete('/api/v1/groups/:id', _verifytoken2.default.verifyToken, _groups2.default.deleteGroup);

router.delete('/api/v1/groups/:groupid/users/:id', _verifytoken2.default.verifyToken, _groups2.default.deleteGroupMember);

exports.default = router;