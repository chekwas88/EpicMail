import validationUtils from '../utils/validationHelper';

class ValidateGroup {
  static ValidateGroupData(req, res, next) {
    const errors = validationUtils.createGroupValidation(req);
    if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
      return res.status(400).json({
        status: res.statusCode,
        errors,
      });
    }
    return next();
  }
}
export default ValidateGroup;
