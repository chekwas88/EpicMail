import users from '../model/users';
import HelperUtils from '../utils/helper';
// import error from '../utils/error';

// const { BadRequestError } = error;

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
    users.push(user);
    const regUser = users.find(u => u.id === id);
    const token = HelperUtils.generateToken();
    regUser.token = token;
    return res.status(201).json({
      status: res.statusCode,
      message: 'Account created successfully',
      data: [{ token }],
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
      email: req.body.email,
      password: req.body.password,
    };
    const authUser = users.find(user => user.email === loginDetails.email);
    const token = HelperUtils.generateToken();
    authUser.token = token;
    // console.log(req.user);
    return res.status(201).json({
      status: res.statusCode,
      message: 'login was successful',
      data: [{ token }],
    });
  }
}


export default UserController;
