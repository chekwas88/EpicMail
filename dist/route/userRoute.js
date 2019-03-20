'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('../controllers/users');

var _users2 = _interopRequireDefault(_users);

var _validateUser = require('../middleware/validateUser');

var _validateUser2 = _interopRequireDefault(_validateUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.post('/api/v1/auth/signup', _validateUser2.default.checkEmail, _validateUser2.default.validateUserRegData, _validateUser2.default.validateUserRegPassword, _users2.default.registerUser);

router.post('/api/v1/auth/login', _validateUser2.default.validateUserLoginData, _validateUser2.default.validateLogin, _users2.default.loginUser);

exports.default = router;