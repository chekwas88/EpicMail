'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _dbConnection = require('../db/dbConnection');

var _dbConnection2 = _interopRequireDefault(_dbConnection);

var _messageHelper = require('../utils/messageHelper');

var _messageHelper2 = _interopRequireDefault(_messageHelper);

var _validationHelper = require('../utils/validationHelper');

var _validationHelper2 = _interopRequireDefault(_validationHelper);

var _queries = require('../utils/queries');

var _queries2 = _interopRequireDefault(_queries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

class UserController {
  /**
    * @function registerUser - creates a user
    * @param {object} req - request object
    * @param {object} res - response object
    * @returns {object} json data
  */

  static async registerUser(req, res) {
    const rD = {
      firstName: req.body.firstName.trim(),
      lastName: req.body.lastName.trim(),
      email: req.body.email.trim(),
      password: req.body.password.trim(),
      confirmPassword: req.body.confirmPassword.trim()
    };
    const encryptedPassword = _validationHelper2.default.hidePassword(rD.password);
    const encryptedcPassword = _validationHelper2.default.hidePassword(rD.confirmPassword);
    const { rows } = await _dbConnection2.default.query(_queries2.default.registerUserQuery, [rD.firstName, rD.lastName, rD.email, encryptedPassword, encryptedcPassword]);
    const user = rows[0];
    const token = _messageHelper2.default.generateToken({ id: user.id });
    return res.status(201).json({
      status: res.statusCode,
      data: [{
        token,
        message: 'Account created successfully',
        user
      }]
    });
  }

  /**
    * @function loginUser - log's in a user
    * @param {object} req - request object
    * @param {object} res - response object
    * @returns {object} json data
  */

  static async loginUser(req, res) {
    const { rows } = await _dbConnection2.default.query(_queries2.default.loginQuery, [req.body.email.trim()]);
    const authUser = rows[0];
    const { id } = authUser;
    const payload = { id };
    const token = _messageHelper2.default.generateToken(payload);
    return res.status(200).json({
      status: res.statusCode,
      data: [{
        token,
        message: 'login was successful'
      }]
    });
  }
}

exports.default = UserController;