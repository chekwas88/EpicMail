'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cpasswordSchema = exports.passwordSchema = exports.emailSchema = exports.lastnameSchema = exports.firstnameSchema = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const firstnameSchema = exports.firstnameSchema = {
  firstname: _joi2.default.string().min(2).max(50).required().trim().regex(/^[a-zA-Z]+$/)
};
const lastnameSchema = exports.lastnameSchema = {
  lastname: _joi2.default.string().min(2).max(50).required().trim().regex(/^[a-zA-Z]+$/)
};
const emailSchema = exports.emailSchema = {
  email: _joi2.default.string().email().required().trim()
};
const passwordSchema = exports.passwordSchema = {
  password: _joi2.default.string().required().min(6).trim()
};
const cpasswordSchema = exports.cpasswordSchema = {
  confirmpassword: _joi2.default.string().required().min(6).trim()
};