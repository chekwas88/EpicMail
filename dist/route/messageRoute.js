"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _message = _interopRequireDefault(require("../controllers/message"));

var _validateMessage = _interopRequireDefault(require("../middleware/validateMessage"));

var _verifytoken = _interopRequireDefault(require("../middleware/verifytoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/api/v1/messages', _verifytoken["default"].verifyToken, _validateMessage["default"].validateMessageData, _validateMessage["default"].validateRecipient, _message["default"].createMessage);
router.get('/api/v1/messages', _verifytoken["default"].verifyToken, _message["default"].getReceivedMessages);
router.get('/api/v1/messages/unread', _verifytoken["default"].verifyToken, _message["default"].getUnreadMessages);
router.get('/api/v1/messages/sent', _verifytoken["default"].verifyToken, _message["default"].getSentMessages);
router.get('/api/v1/messages/:id', _verifytoken["default"].verifyToken, _validateMessage["default"].validateIdparams, _message["default"].getAMessage);
router["delete"]('/api/v1/messages/:id', _verifytoken["default"].verifyToken, _validateMessage["default"].validateIdparams, _message["default"].deleteAMessage);
var _default = router;
exports["default"] = _default;