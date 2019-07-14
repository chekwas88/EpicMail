"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recipientsSchema = exports.messageSchema = exports.subjectSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var subjectSchema = {
  subject: _joi["default"].string().required().min(2).max(100).trim()
};
exports.subjectSchema = subjectSchema;
var messageSchema = {
  message: _joi["default"].string().required()
};
exports.messageSchema = messageSchema;
var recipientsSchema = {
  recipient: _joi["default"].string().email().required().trim()
};
exports.recipientsSchema = recipientsSchema;