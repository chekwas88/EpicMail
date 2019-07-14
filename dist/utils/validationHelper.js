"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _userValidationSchemas = require("./userValidationSchemas");

var _messageValidationSchemas = require("./messageValidationSchemas");

var _groupValidationSchema = require("./groupValidationSchema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ValidationHelper =
/*#__PURE__*/
function () {
  function ValidationHelper() {
    _classCallCheck(this, ValidationHelper);
  }

  _createClass(ValidationHelper, null, [{
    key: "registerUserValidation",

    /**
       * @function registerUserValidation - validates the user registration schema object passed to it
       * @param {object} req - request object
       * @param {object} res - response object
       * @returns {object} errors
       *
       * */
    value: function registerUserValidation(req) {
      var firstnameResult = _joi["default"].validate({
        firstname: req.body.firstName
      }, _userValidationSchemas.firstnameSchema);

      var lastnameResult = _joi["default"].validate({
        lastname: req.body.lastName
      }, _userValidationSchemas.lastnameSchema);

      var emailResult = _joi["default"].validate({
        email: req.body.email
      }, _userValidationSchemas.emailSchema);

      var passwordResult = _joi["default"].validate({
        password: req.body.password
      }, _userValidationSchemas.passwordSchema);

      var cpasswordResult = _joi["default"].validate({
        confirmpassword: req.body.confirmPassword
      }, _userValidationSchemas.cpasswordSchema);

      var errors = {};

      if (firstnameResult.error !== null) {
        errors.firstName = 'Firstname should be provided and should have minimum of 2 characters and maximum of 50 chracters and is required';
      }

      if (lastnameResult.error !== null) {
        errors.lastName = 'Lastname should be provided and should have minimum of 2 and maximum of 50 characters and is required';
      }

      if (emailResult.error !== null) {
        errors.email = 'Email should be provided and should be a valid email type';
      }

      if (passwordResult.error !== null) {
        errors.password = 'Password should be provided and should have minimum of 6 characters';
      }

      if (cpasswordResult.error !== null) {
        errors.confirmPassword = 'confirmPassword should be provided and should have minimum of 6 characters';
      }

      return errors;
    }
    /**
     * @function messageSchemavalidation - validates the message schema of object passed to it
     * @param {object} req - object
     * @returns {object} errors
     *
     * */

  }, {
    key: "messageSchemavalidation",
    value: function messageSchemavalidation(req) {
      var errors = {};

      var subjectResult = _joi["default"].validate({
        subject: req.body.subject
      }, _messageValidationSchemas.subjectSchema);

      var messageResult = _joi["default"].validate({
        message: req.body.message
      }, _messageValidationSchemas.messageSchema);

      var recipientsResult = _joi["default"].validate({
        recipient: req.body.recipient
      }, _messageValidationSchemas.recipientsSchema);

      if (subjectResult.error !== null) {
        errors.subject = 'subject should be provided and must be minimum of 2 to maximum 50 characters';
      }

      if (messageResult.error !== null) {
        errors.message = 'message should be provided';
      }

      if (recipientsResult.error !== null) {
        errors.recipient = 'recipients should be email(s) and should be provided';
      }

      return errors;
    }
    /**
     *
     * @function hashPassword
     * @param {string} password
     * @returns {string}
     */

  }, {
    key: "hidePassword",
    value: function hidePassword(password) {
      return _bcrypt["default"].hashSync(password, _bcrypt["default"].genSaltSync(6));
    }
    /**
    *
    * @function checkPassword
    * @param {string} password
    * @returns {string}
    */

  }, {
    key: "checkPassword",
    value: function checkPassword(a, b) {
      return _bcrypt["default"].compareSync(a, b);
    }
    /**
     * @function loginSchemaValidation - validates the login schema object passed to it
     * @param {object} req - object
     * @returns {object} errors
     *
     * */

  }, {
    key: "loginSchemaValidation",
    value: function loginSchemaValidation(req) {
      var errors = {};

      var emailValidation = _joi["default"].validate({
        email: req.body.email
      }, _userValidationSchemas.emailSchema);

      var passwordValidation = _joi["default"].validate({
        password: req.body.password
      }, _userValidationSchemas.passwordSchema);

      if (emailValidation.error !== null) {
        errors.email = 'Email should be provided and should be a valid email type';
      }

      if (passwordValidation.error !== null) {
        errors.password = 'Password should be provided and should have minimum of 6 characters';
      }

      return errors;
    }
  }, {
    key: "addMemberValidation",
    value: function addMemberValidation(req) {
      var errors = {};

      var emailValidation = _joi["default"].validate({
        email: req.body.email
      }, _userValidationSchemas.emailSchema);

      var roleValidation = _joi["default"].validate({
        role: req.body.role
      }, _groupValidationSchema.groupRoleSchema);

      if (emailValidation.error !== null) {
        errors.email = 'Email should be provided and should be a valid email type';
      }

      if (roleValidation.error !== null) {
        errors.role = 'Member\'s role should be provided';
      }

      return errors;
    }
  }, {
    key: "createGroupValidation",
    value: function createGroupValidation(req) {
      var errors = {};

      var groupResult = _joi["default"].validate({
        name: req.body.name
      }, _groupValidationSchema.groupNameSchema);

      if (groupResult.error !== null) {
        errors.name = 'Group name should be provided';
      }

      return errors;
    }
  }, {
    key: "groupMessageValidation",
    value: function groupMessageValidation(req) {
      var errors = {};

      var subjectResult = _joi["default"].validate({
        subject: req.body.subject
      }, _messageValidationSchemas.subjectSchema);

      var messageResult = _joi["default"].validate({
        message: req.body.message
      }, _messageValidationSchemas.messageSchema);

      if (subjectResult.error !== null) {
        errors.subject = 'subject should be provided and must be minimum of 2 to maximum 50 characters';
      }

      if (messageResult.error !== null) {
        errors.message = 'message should be provided';
      }

      return errors;
    }
  }]);

  return ValidationHelper;
}();

var _default = ValidationHelper;
exports["default"] = _default;