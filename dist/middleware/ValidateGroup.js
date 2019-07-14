"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validationHelper = _interopRequireDefault(require("../utils/validationHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ValidateGroup =
/*#__PURE__*/
function () {
  function ValidateGroup() {
    _classCallCheck(this, ValidateGroup);
  }

  _createClass(ValidateGroup, null, [{
    key: "ValidateGroupData",
    value: function ValidateGroupData(req, res, next) {
      var errors = _validationHelper["default"].createGroupValidation(req);

      if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
        return res.status(400).json({
          status: res.statusCode,
          errors: errors
        });
      }

      return next();
    }
  }, {
    key: "validateGroupMember",
    value: function validateGroupMember(req, res, next) {
      var errors = _validationHelper["default"].addMemberValidation(req);

      if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
        return res.status(400).json({
          status: res.statusCode,
          errors: errors
        });
      }

      return next();
    }
  }, {
    key: "validateMessageData",
    value: function validateMessageData(req, res, next) {
      var errors = _validationHelper["default"].groupMessageValidation(req);

      if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
        return res.status(400).json({
          status: res.statusCode,
          errors: errors
        });
      }

      return next();
    }
  }]);

  return ValidateGroup;
}();

var _default = ValidateGroup;
exports["default"] = _default;