import Joi from 'joi';
import HelperUtils from '../utils/helper';
// import error from '../utils/error';

// const { BadRequestError } = error;

class ValidateEntries {
  /**
     * @function  validateData - check for input validation before creating a diary entry
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {function} next
     *
  */
  static validateUserRegData(req, res, next) {
    const schema = {
      id: Joi.number().required(),
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    };
    HelperUtils.schemaValidation(req, schema, res, next);
  }
}

export default ValidateEntries;
