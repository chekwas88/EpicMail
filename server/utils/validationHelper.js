import Joi from 'joi';
import bcrypt from 'bcrypt';
import {
  firstnameSchema,
  lastnameSchema,
  emailSchema,
  passwordSchema,
  cpasswordSchema,
} from './userValidationSchemas';

import {
  subjectSchema,
  messageSchema,
  recipientsSchema,
} from './messageValidationSchemas';

import { groupNameSchema, groupRoleSchema } from './groupValidationSchema';

class ValidationHelper {
/**
   * @function registerUserValidation - validates the user registration schema object passed to it
   * @param {object} req - request object
   * @param {object} res - response object
   * @returns {object} errors
   *
   * */

  static registerUserValidation(req) {
    const firstnameResult = Joi.validate({ firstname: req.body.firstName }, firstnameSchema);
    const lastnameResult = Joi.validate({ lastname: req.body.lastName }, lastnameSchema);
    const emailResult = Joi.validate({ email: req.body.email }, emailSchema);
    const passwordResult = Joi.validate({ password: req.body.password }, passwordSchema);
    const cpasswordResult = Joi.validate(
      { confirmpassword: req.body.confirmPassword },
      cpasswordSchema,
    );
    const errors = {};
    if (firstnameResult.error !== null) {
      errors.firstName = 'Firstname should be provided and should have minimum of 2 characters and maximum of 50 chracters and is required';
    }

    if (lastnameResult.error !== null) {
      errors.lastName = 'Lastname should be provided and should have minimum of 2 and maximum of 50 characters and is required';
    }

    if (emailResult.error !== null) {
      errors.email = 'Email should be provided and should be a valid email type';
    }
    if (passwordResult.error !== null) {
      errors.password = 'Password should be provided and should have minimum of 6 characters';
    }
    if (cpasswordResult.error !== null) {
      errors.confirmPassword = 'confirmPassword should be provided and should have minimum of 6 characters';
    }
    return errors;
  }

  /**
   * @function messageSchemavalidation - validates the message schema of object passed to it
   * @param {object} req - object
   * @returns {object} errors
   *
   * */

  static messageSchemavalidation(req) {
    const errors = {};
    const subjectResult = Joi.validate({ subject: req.body.subject }, subjectSchema);
    const messageResult = Joi.validate({ message: req.body.message }, messageSchema);
    const recipientsResult = Joi.validate({ recipients: req.body.recipients }, recipientsSchema);
    if (subjectResult.error !== null) {
      errors.subject = 'subject should be provided and must be minimum of 2 to maximum 50 characters';
    }
    if (messageResult.error !== null) {
      errors.message = 'message should be provided';
    }
    if (recipientsResult.error !== null) {
      errors.recipients = 'recipients should be email(s) and should be provided';
    }
    return errors;
  }

  /**
   *
   * @function hashPassword
   * @param {string} password
   * @returns {string}
   */
  static hidePassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(6));
  }

  /**
 *
 * @function checkPassword
 * @param {string} password
 * @returns {string}
 */
  static checkPassword(a, b) {
    return bcrypt.compareSync(a, b);
  }
  /**
   * @function loginSchemaValidation - validates the login schema object passed to it
   * @param {object} req - object
   * @returns {object} errors
   *
   * */

  static loginSchemaValidation(req) {
    const errors = {};
    const emailValidation = Joi.validate({ email: req.body.email }, emailSchema);
    const passwordValidation = Joi.validate({ password: req.body.password }, passwordSchema);
    if (emailValidation.error !== null) {
      errors.email = 'Email should be provided and should be a valid email type';
    }
    if (passwordValidation.error !== null) {
      errors.password = 'Password should be provided and should have minimum of 6 characters';
    }
    return errors;
  }

  static addMemberValidation(req) {
    const errors = {};
    const emailValidation = Joi.validate({ email: req.body.email }, emailSchema);
    const roleValidation = Joi.validate({ role: req.body.role }, groupRoleSchema);
    if (emailValidation.error !== null) {
      errors.email = 'Email should be provided and should be a valid email type';
    }
    if (roleValidation.error !== null) {
      errors.role = 'Member\'s role should be provided';
    }
    return errors;
  }

  static createGroupValidation(req) {
    const errors = {};
    const groupResult = Joi.validate({ name: req.body.name }, groupNameSchema);
    if (groupResult.error !== null) {
      errors.name = 'Group name should be provided';
    }
    return errors;
  }

  static groupMessageValidation(req) {
    const errors = {};
    const subjectResult = Joi.validate({ subject: req.body.subject }, subjectSchema);
    const messageResult = Joi.validate({ message: req.body.message }, messageSchema);
    if (subjectResult.error !== null) {
      errors.subject = 'subject should be provided and must be minimum of 2 to maximum 50 characters';
    }
    if (messageResult.error !== null) {
      errors.message = 'message should be provided';
    }
    return errors;
  }
}

export default ValidationHelper;
