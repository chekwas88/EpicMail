import users from '../model/users';
import error from '../utils/error';

const { BadRequestError } = error;

class UserController {
  /**
    * @function registerUser - creates a user
    * @param {object} req - request object
    * @param {object} res - response object
    * @returns {object} json data
  */

  static registerUser(req, res) {
    const id = users.length + 1;
    const user = {
      id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      confirmpassword: req.body.confirmpassword,
    };
    try {
      if (user.password !== user.confirmpassword) {
        throw new BadRequestError('Please confirm your password');
      }
      users.push(user);
      return res.status(201).json({
        status: res.statusCode,
        message: 'Account created successfully',
      });
    } catch (e) {
      return res.status(400).json({
        status: res.statusCode,
        error: `${e.name}: ${e.message}`,
      });
    }
  }
}

export default UserController;
