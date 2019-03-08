import Joi from 'joi';
import HelperUtils from '../utils/helper';
// import users from '../model/users';
// import error from '../utils/error';
// import message from '../model/message';

// const { AuthenticationError } = error;

class ValidateMessage {
  /**
     * @function  validateMessageData - check for input validation before creating a message
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {function} next
     *
  */
  static validateMessageData(req, res, next) {
    const schema = {
      createdOn: Joi.string().required(),
      subject: Joi.string().required(),
      message: Joi.string().required(),
      status: Joi.string().required(),
      parentMessageId: Joi.number().integer(),
      recipients: Joi.array().items(Joi.string().email()).single().required(),
    };
    HelperUtils.schemaValidation(req, schema, res, next);
  }
}

export default ValidateMessage;
