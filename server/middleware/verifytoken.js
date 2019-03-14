import users from '../model/users';
import error from '../utils/error';


const { UnAuthorizedError } = error;

class Token {
  static verifyToken(req, res, next) {
    try {
      if (!req.headers.authorization) {
        throw new UnAuthorizedError('No authorization is provided');
      }
      const token = req.headers.authorization.split(' ')[1];
      const verifiedUser = users.find(u => u.token === token);
      if (!verifiedUser) {
        throw new UnAuthorizedError('token not verified');
      }
      return next();
    } catch (e) {
      return res.status(401).json({
        status: res.statusCode,
        error: `${e.name}: ${e.message}`,
      });
    }
  }
}
export default Token;
