import ValidationUtils from '../utils/validationHelper';
import MessageHelper from '../utils/messageHelper';

class ValidateMessage {
  /**
     * @function  validateMessageData - check for input validation before creating a message
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {function} next
     *
  */
  static validateMessageData(req, res, next) {
    const errors = ValidationUtils.messageSchemavalidation(req);
    if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
      return res.status(400).json({
        status: res.statusCode,
        errors,
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
    const user = await MessageHelper.getUser(mailRecipients);
    if (!user) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'No registered email was found',
      });
    }
    return next();
  }

  static validateIdparams(req, res, next) {
    if (Number.isNaN(Number(req.params.id))) {
      return res.status(400).json({ status: 400, error: 'The id parameter must be a number' });
    }
    return next();
  }

  static validategroupId(req, res, next) {
    if (Number.isNaN(Number(req.params.groupid))) {
      return res.status(400).json({ status: 400, error: 'The id parameter must be a number' });
    }
    return next();
  }
}

export default ValidateMessage;
