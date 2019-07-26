import dotenv from 'dotenv';
import validationUtils from '../utils/validationHelper';
import pool from '../db/dbConnection';
import queries from '../utils/queries';

dotenv.config();
class Validate {
  /**
     * @function  validateUserRegData - check for input validation before creating a diary entry
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {function} next
     *
  */
  static validateUserRegData(req, res, next) {
    const errors = validationUtils.registerUserValidation(req);
    if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
      return res.status(400).json({
        status: res.statusCode,
        errors,
      });
    }
    return next();
  }


  /**
     * @function  validateUserLoginData - check for input validation before user login
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {function} next
     *
  */
  static validateUserLoginData(req, res, next) {
    const errors = validationUtils.loginSchemaValidation(req);
    if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
      return res.status(400).json({
        status: res.statusCode,
        errors,
      });
    }
    return next();
  }

  /**
     * @function  validateUserRegPassword - validates password
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {function} next
     *
  */
  static validateUserRegPassword(req, res, next) {
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        status: res.statusCode,
        error: 'password and confirm password should be same',
      });
    }
    return next();
  }

  /**
     * @function  checkEmail - check if email is has been before  registered
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {function} next
     *
  */
  static checkEmail(req, res, next) {
    pool.query(
      queries.loginQuery,
      [req.body.email.trim()],
    ).then((response) => {
      if (response.rows[0]) {
        return res.status(400).json({
          status: res.statusCode,
          error: 'email has been registered before',
        });
      }
      return next();
    });
  }

  /**
     * @function  validateLogin - validates if user exists before login
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {function} next
     *
  */

  static validateLogin(req, res, next) {
    pool.query(
      queries.loginQuery,
      [req.body.email.trim()],
    ).then((response) => {
      const user = response.rows[0];
      if (!user) {
        return res.status(400).json({
          status: res.statusCode,
          error: 'invalid email or password',
        });
      }
      const verifyPassword = validationUtils.checkPassword(req.body.password, user.password);
      if (!verifyPassword) {
        return res.status(400).json({
          status: res.statusCode,
          error: 'invalid email or password',
        });
      }
      return next();
    });
  }
}

export default Validate;
