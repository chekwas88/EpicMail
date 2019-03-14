import users from '../model/users';
import HelperUtils from '../utils/helper';

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
      firstname: req.body.firstname.trim(),
      lastname: req.body.lastname.trim(),
      email: req.body.email.trim(),
      password: req.body.password.trim(),
      confirmpassword: req.body.confirmpassword.trim(),
      isAdmin: req.body.isAdmin,
    };
    users.push(user);
    const regUser = users.find(u => u.id === id);
    const token = HelperUtils.generateToken();
    regUser.token = token;
    return res.status(201).json({
      status: res.statusCode,
      data: [
        {
          token,
          message: 'Account created successfully',
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

  static loginUser(req, res) {
    const loginDetails = {
      email: req.body.email.trim(),
      password: req.body.password.trim(),
    };
    const authUser = users.find(user => user.email === loginDetails.email);
    const token = HelperUtils.generateToken();
    authUser.token = token;
    return res.status(201).json({
      status: res.statusCode,
      data: [
        {
          token,
          message: 'login was successful',
        },
      ],
    });
  }
}


export default UserController;
