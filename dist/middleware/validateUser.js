'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _validationHelper = require('../utils/validationHelper');

var _validationHelper2 = _interopRequireDefault(_validationHelper);

var _dbConnection = require('../db/dbConnection');

var _dbConnection2 = _interopRequireDefault(_dbConnection);

var _queries = require('../utils/queries');

var _queries2 = _interopRequireDefault(_queries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
class Validate {
  /**
     * @function  validateUserRegData - check for input validation before creating a diary entry
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {function} next
     *
  */
  static validateUserRegData(req, res, next) {
    const errors = _validationHelper2.default.registerUserValidation(req);
    if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
      return res.status(400).json({
        status: res.statusCode,
        errors
      });
    }
    return next();
  }

  /**
     * @function  validateUserLoginData - check for input validation before user login
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {function} next
     *
  */
  static validateUserLoginData(req, res, next) {
    const errors = _validationHelper2.default.loginSchemaValidation(req);
    if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
      return res.status(400).json({
        status: res.statusCode,
        errors
      });
    }
    return next();
  }

  /**
     * @function  validateUserRegPassword - validates password
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {function} next
     *
  */
  static validateUserRegPassword(req, res, next) {
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        status: res.statusCode,
        error: 'password and confirmpassword should be same'
      });
    }
    return next();
  }

  /**
     * @function  checkEmail - check if email is has been before  registered
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {function} next
     *
  */
  static checkEmail(req, res, next) {
    _dbConnection2.default.query(_queries2.default.loginQuery, [req.body.email.trim()]).then(response => {
      if (response.rows[0]) {
        return res.status(400).json({
          status: res.statusCode,
          error: 'password and confirmpassword should be same'
        });
      }
      return next();
    });
  }

  /**
     * @function  validateLogin - validates if user exists before login
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {function} next
     *
  */

  static validateLogin(req, res, next) {
    _dbConnection2.default.query(_queries2.default.loginQuery, [req.body.email.trim()]).then(response => {
      const user = response.rows[0];
      if (!user) {
        return res.status(400).json({
          status: res.statusCode,
          error: 'invalid email or password'
        });
      }
      const verifyPassword = _validationHelper2.default.checkPassword(req.body.password, user.password);
      if (!verifyPassword) {
        return res.status(400).json({
          status: res.statusCode,
          error: 'invalid email or password'
        });
      }
      return next();
    });
  }
}

exports.default = Validate;