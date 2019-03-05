import Joi from 'joi';
import error from './error';
import users from '../model/users';

const { BadRequestError } = error;

class HelperUtils {
  /**
   * @function schemaValidation - validates the schema of object passed to it
   * @param {object} req - request object
   * @param {object} res - response object
   * @returns {function} next
   *
   * */
  static schemaValidation(req, schema, res, next) {
    const result = Joi.validate(req.body, schema);
    try {
      if (result.error !== null) {
        throw new BadRequestError(result.error.details[0].message);
      }
      return next();
    } catch (e) {
      return res.status(400).json({
        status: res.statusCode,
        error: `${e.name}: ${e.message}`,
      });
    }
  }

  /**
     * @function  validateRecipients - check if a recipient or recipients are registered user(s)
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {function} next
     *
  */
  static validateRecipients(mailRecipients) {
    const registeredRecipients = users.map(m => m.email);
    const recipients = [];
    mailRecipients.forEach((recipient) => {
      if (registeredRecipients.includes(recipient)) {
        recipients.push(recipient);
      }
    });
    return recipients;
  }
}

export default HelperUtils;
