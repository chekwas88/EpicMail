'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _message = require('../controllers/message');

var _message2 = _interopRequireDefault(_message);

var _validateMessage = require('../middleware/validateMessage');

var _validateMessage2 = _interopRequireDefault(_validateMessage);

var _verifytoken = require('../middleware/verifytoken');

var _verifytoken2 = _interopRequireDefault(_verifytoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.post('/api/v1/messages', _verifytoken2.default.verifyToken, _validateMessage2.default.validateMessageData, _validateMessage2.default.validateRecipient, _message2.default.createMessage);

router.get('/api/v1/messages', _verifytoken2.default.verifyToken, _message2.default.getReceivedMessages);

router.get('/api/v1/messages/unread', _verifytoken2.default.verifyToken, _message2.default.getUnreadMessages);

router.get('/api/v1/messages/sent', _verifytoken2.default.verifyToken, _message2.default.getSentMessages);

router.get('/api/v1/messages/:id', _verifytoken2.default.verifyToken, _validateMessage2.default.validateIdparams, _message2.default.getAMessage);

router.delete('/api/v1/messages/:id', _verifytoken2.default.verifyToken, _validateMessage2.default.validateIdparams, _message2.default.deleteAMessage);

exports.default = router;