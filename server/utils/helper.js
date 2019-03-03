import Joi from 'joi';
import error from './error';

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
}

export default HelperUtils;
