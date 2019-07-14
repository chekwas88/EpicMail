"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("../controllers/users"));

var _validateUser = _interopRequireDefault(require("../middleware/validateUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/api/v1/auth/signup', _validateUser["default"].validateUserRegData, _validateUser["default"].checkEmail, _validateUser["default"].validateUserRegPassword, _users["default"].registerUser);
router.post('/api/v1/auth/login', _validateUser["default"].validateUserLoginData, _validateUser["default"].validateLogin, _users["default"].loginUser);
var _default = router;
exports["default"] = _default;