import Joi from 'joi';
import HelperUtils from '../utils/helper';
import error from '../utils/error';

const { AuthenticationError } = error;

class Validate {
  /**
     * @function  validateData - check for input validation before creating a diary entry
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {function} next
     *
  */
  static validateUserRegData(req, res, next) {
    const schema = {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      confirmpassword: Joi.string().required(),
    };
    HelperUtils.schemaValidation(req, schema, res, next);
  }

  /**
     * @function  validatePassword - validates password
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {function} next
     *
  */
  static validatePassword(req, res, next) {
    try {
      if (req.body.password !== req.body.confirmpassword) {
        throw new AuthenticationError('Please confirm your password');
      }
      return next();
    } catch (e) {
      return res.status(403).json({
        status: res.statusCode,
        error: `${e.name}: ${e.message}`,
      });
    }
  }
}

export default Validate;
