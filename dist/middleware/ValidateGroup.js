'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validationHelper = require('../utils/validationHelper');

var _validationHelper2 = _interopRequireDefault(_validationHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ValidateGroup {
  static ValidateGroupData(req, res, next) {
    const errors = _validationHelper2.default.createGroupValidation(req);
    if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
      return res.status(400).json({
        status: res.statusCode,
        errors
      });
    }
    return next();
  }

  static validateGroupMember(req, res, next) {
    const errors = _validationHelper2.default.addMemberValidation(req);
    if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
      return res.status(400).json({
        status: res.statusCode,
        errors
      });
    }
    return next();
  }

  static validateMessageData(req, res, next) {
    const errors = _validationHelper2.default.groupMessageValidation(req);
    if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
      return res.status(400).json({
        status: res.statusCode,
        errors
      });
    }
    return next();
  }
}
exports.default = ValidateGroup;