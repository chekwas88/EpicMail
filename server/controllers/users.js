import dotenv from 'dotenv';
import pool from '../db/dbConnection';
import HelperUtils from '../utils/messageHelper';
import ValidationUtils from '../utils/validationHelper';
import queries from '../utils/queries';


dotenv.config();

class UserController {
  /**
    * @function registerUser - creates a user
    * @param {object} req - request object
    * @param {object} res - response object
    * @returns {object} json data
  */

  static async registerUser(req, res) {
    const rD = {
      firstName: req.body.firstName.trim(),
      lastName: req.body.lastName.trim(),
      email: req.body.email.trim(),
      password: req.body.password.trim(),
      confirmPassword: req.body.confirmPassword.trim(),
    };
    const encryptedPassword = ValidationUtils.hidePassword(rD.password);
    const encryptedcPassword = ValidationUtils.hidePassword(rD.confirmPassword);
    const { rows } = await pool.query(
      queries.registerUserQuery,
      [rD.firstName, rD.lastName, rD.email, encryptedPassword, encryptedcPassword],
    );
    const authUser = rows[0];
    const { firstname, lastname, id } = authUser;
    const user = { firstname, lastname };
    const token = HelperUtils.generateToken({ id });
    return res.status(201).json({
      status: res.statusCode,
      data: [
        {
          token,
          message: 'Account created successfully',
          user,
        },
      ],
    });
  }

  /**
    * @function loginUser - log's in a user
    * @param {object} req - request object
    * @param {object} res - response object
    * @returns {object} json data
  */

  static async loginUser(req, res) {
    const { rows } = await pool.query(
      queries.loginQuery,
      [req.body.email.trim()],
    );
    const authUser = rows[0];
    const { id, firstname, lastname } = authUser;
    const payload = { id };
    const user = {
      firstname,
      lastname,
    };
    const token = HelperUtils.generateToken(payload);
    return res.status(200).json({
      status: res.statusCode,
      data: [
        {
          message: 'login was successful',
          token,
          user,
        },
      ],
    });
  }
}


export default UserController;
