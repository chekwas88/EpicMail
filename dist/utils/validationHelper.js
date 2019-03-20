'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _userValidationSchemas = require('./userValidationSchemas');

var _messageValidationSchemas = require('./messageValidationSchemas');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ValidationHelper {
  /**
     * @function registerUserValidation - validates the user registration schema object passed to it
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {object} errors
     *
     * */

  static registerUserValidation(req) {
    const firstnameResult = _joi2.default.validate({ firstname: req.body.firstName }, _userValidationSchemas.firstnameSchema);
    const lastnameResult = _joi2.default.validate({ lastname: req.body.lastName }, _userValidationSchemas.lastnameSchema);
    const emailResult = _joi2.default.validate({ email: req.body.email }, _userValidationSchemas.emailSchema);
    const passwordResult = _joi2.default.validate({ password: req.body.password }, _userValidationSchemas.passwordSchema);
    const cpasswordResult = _joi2.default.validate({ confirmpassword: req.body.confirmPassword }, _userValidationSchemas.cpasswordSchema);
    const errors = {};
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

  static messageSchemavalidation(req) {
    const errors = {};
    const subjectResult = _joi2.default.validate({ subject: req.body.subject }, _messageValidationSchemas.subjectSchema);
    const messageResult = _joi2.default.validate({ message: req.body.message }, _messageValidationSchemas.messageSchema);
    const recipientsResult = _joi2.default.validate({ recipients: req.body.recipients }, _messageValidationSchemas.recipientsSchema);
    if (subjectResult.error !== null) {
      errors.subject = 'subject should be provided and must be minimum of 2 to maximum 50 characters';
    }
    if (messageResult.error !== null) {
      errors.message = 'message should be provided';
    }
    if (recipientsResult.error !== null) {
      // console.log(recipientsResult.error.details[0]);
      errors.recipients = 'recipients should be email(s) and should be provided';
    }
    return errors;
  }

  /**
   *
   * @function hashPassword
   * @param {string} password
   * @returns {string}
   */
  static hidePassword(password) {
    return _bcrypt2.default.hashSync(password, _bcrypt2.default.genSaltSync(6));
  }

  /**
  *
  * @function checkPassword
  * @param {string} password
  * @returns {string}
  */
  static checkPassword(a, b) {
    return _bcrypt2.default.compareSync(a, b);
  }
  /**
   * @function loginSchemaValidation - validates the login schema object passed to it
   * @param {object} req - object
   * @returns {object} errors
   *
   * */

  static loginSchemaValidation(req) {
    const errors = {};
    const emailValidation = _joi2.default.validate({ email: req.body.email }, _userValidationSchemas.emailSchema);
    const passwordValidation = _joi2.default.validate({ password: req.body.password }, _userValidationSchemas.passwordSchema);
    if (emailValidation.error !== null) {
      errors.email = 'Email should be provided and should be a valid email type';
    }
    if (passwordValidation.error !== null) {
      errors.password = 'Password should be provided and should have minimum of 6 characters';
    }
    return errors;
  }
}

exports.default = ValidationHelper;