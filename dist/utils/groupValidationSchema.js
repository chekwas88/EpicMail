'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupRoleSchema = exports.groupNameSchema = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const groupNameSchema = exports.groupNameSchema = {
  name: _joi2.default.string().required().max(50).trim()
};

const groupRoleSchema = exports.groupRoleSchema = {
  role: _joi2.default.string().required().max(50).trim()
};