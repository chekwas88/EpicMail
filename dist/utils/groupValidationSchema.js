"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupRoleSchema = exports.groupNameSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var groupNameSchema = {
  name: _joi["default"].string().required().max(50).trim()
};
exports.groupNameSchema = groupNameSchema;
var groupRoleSchema = {
  role: _joi["default"].string().required().max(50).trim()
};
exports.groupRoleSchema = groupRoleSchema;