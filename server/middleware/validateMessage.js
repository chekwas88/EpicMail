import HelperUtils from '../utils/helper';

class ValidateMessage {
  /**
     * @function  validateMessageData - check for input validation before creating a message
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {function} next
     *
  */
  static validateMessageData(req, res, next) {
    const errors = HelperUtils.messageSchemavalidation(req);
    if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
      return res.status(400).json({
        status: res.statusCode,
        errors,
      });
    }
    return next();
  }
}

export default ValidateMessage;
