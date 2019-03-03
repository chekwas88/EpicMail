import users from '../model/users';

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
    return res.status(201).json({
      status: res.statusCode,
      message: 'Account created successfully',
    });
  }
}

export default UserController;
