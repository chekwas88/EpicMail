"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _groups = _interopRequireDefault(require("../controllers/groups"));

var _validateMessage = _interopRequireDefault(require("../middleware/validateMessage"));

var _ValidateGroup = _interopRequireDefault(require("../middleware/ValidateGroup"));

var _verifytoken = _interopRequireDefault(require("../middleware/verifytoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/api/v1/groups', _verifytoken["default"].verifyToken, _ValidateGroup["default"].ValidateGroupData, _groups["default"].createGroup);
router.get('/api/v1/groups', _verifytoken["default"].verifyToken, _groups["default"].getAllgroups);
router.post('/api/v1/groups/:id/users', _verifytoken["default"].verifyToken, _validateMessage["default"].validateIdparams, _ValidateGroup["default"].validateGroupMember, _groups["default"].addMemberToGroupByEmail);
router.post('/api/v1/groups/:groupid/users/:id', _verifytoken["default"].verifyToken, _validateMessage["default"].validateIdparams, _validateMessage["default"].validategroupId, _groups["default"].addMemberToGroupById);
router.get('/api/v1/groups/:id/users', _verifytoken["default"].verifyToken, _validateMessage["default"].validateIdparams, _groups["default"].getAllgroupUsers);
router.post('/api/v1/groups/:groupid/messages', _verifytoken["default"].verifyToken, _validateMessage["default"].validategroupId, _ValidateGroup["default"].validateMessageData, _groups["default"].sendMessageToGroup);
router.patch('/api/v1/groups/:id/name', _verifytoken["default"].verifyToken, _validateMessage["default"].validateIdparams, _ValidateGroup["default"].ValidateGroupData, _groups["default"].updateGroup);
router["delete"]('/api/v1/groups/:id', _verifytoken["default"].verifyToken, _validateMessage["default"].validateIdparams, _groups["default"].deleteGroup);
router["delete"]('/api/v1/groups/:groupid/users/:id', _verifytoken["default"].verifyToken, _validateMessage["default"].validategroupId, _validateMessage["default"].validateIdparams, _groups["default"].deleteGroupMember);
var _default = router;
exports["default"] = _default;