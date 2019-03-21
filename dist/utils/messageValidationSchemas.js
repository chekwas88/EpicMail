'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recipientsSchema = exports.messageSchema = exports.subjectSchema = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const subjectSchema = exports.subjectSchema = {
  subject: _joi2.default.string().required().min(2).max(100).trim()
};
const messageSchema = exports.messageSchema = {
  message: _joi2.default.string().required()
};

const recipientsSchema = exports.recipientsSchema = {
  recipients: _joi2.default.string().email().required().trim()
};