'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validationHelper = require('../utils/validationHelper');

var _validationHelper2 = _interopRequireDefault(_validationHelper);

var _messageHelper = require('../utils/messageHelper');

var _messageHelper2 = _interopRequireDefault(_messageHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ValidateMessage {
  /**
     * @function  validateMessageData - check for input validation before creating a message
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {function} next
     *
  */
  static validateMessageData(req, res, next) {
    const errors = _validationHelper2.default.messageSchemavalidation(req);
    if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
      return res.status(400).json({
        status: res.statusCode,
        errors
      });
    }
    return next();
  }

  /**
     * @function  validateRecipient - check if a recipient or recipients are registered user(s)
     * @param {object} mailRecipients - object
     * @returns {array}
     *
  */

  static async validateRecipient(req, res, next) {
    const mailRecipients = req.body.recipients;
    const user = await _messageHelper2.default.getUser(mailRecipients);
    if (!user) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'No registered email was found'
      });
    }
    return next();
  }
}

exports.default = ValidateMessage;