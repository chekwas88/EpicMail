'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recipientsSchema = exports.parentMessageIdSchema = exports.statusSchema = exports.messageSchema = exports.subjectSchema = exports.createdOnSchema = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createdOnSchema = exports.createdOnSchema = {
  createdOn: _joi2.default.string().required().trim()
};

const subjectSchema = exports.subjectSchema = {
  subject: _joi2.default.string().required().min(2).max(100)
};
const messageSchema = exports.messageSchema = {
  message: _joi2.default.string().required()
};
const statusSchema = exports.statusSchema = {
  status: _joi2.default.string().required()
};

const parentMessageIdSchema = exports.parentMessageIdSchema = {
  parentMessageId: _joi2.default.number().integer()
};

const recipientsSchema = exports.recipientsSchema = {
  recipients: _joi2.default.string().email().required().trim()
};