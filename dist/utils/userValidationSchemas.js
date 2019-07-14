"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cpasswordSchema = exports.passwordSchema = exports.emailSchema = exports.lastnameSchema = exports.firstnameSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var firstnameSchema = {
  firstname: _joi["default"].string().min(2).max(50).required().trim().regex(/^[a-zA-Z]+$/)
};
exports.firstnameSchema = firstnameSchema;
var lastnameSchema = {
  lastname: _joi["default"].string().min(2).max(50).required().trim().regex(/^[a-zA-Z]+$/)
};
exports.lastnameSchema = lastnameSchema;
var emailSchema = {
  email: _joi["default"].string().email().required().trim()
};
exports.emailSchema = emailSchema;
var passwordSchema = {
  password: _joi["default"].string().required().min(6).trim()
};
exports.passwordSchema = passwordSchema;
var cpasswordSchema = {
  confirmpassword: _joi["default"].string().required().min(6).trim()
};
exports.cpasswordSchema = cpasswordSchema;