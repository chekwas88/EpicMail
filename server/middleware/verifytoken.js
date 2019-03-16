import users from '../model/users';
import error from '../utils/error';


const { UnAuthorizedError, AuthenticationError } = error;

class Token {
  static verifyToken(req, res, next) {
    try {
      if (!req.headers.authorization) {
        throw new UnAuthorizedError('No authorization is provided');
      }
      const token = req.headers.authorization.split(' ')[1];
      const verifiedUser = users.find(u => u.token === token);
      if (!verifiedUser) {
        throw new AuthenticationError('token not verified');
      }
      return next();
    } catch (e) {
      let tokenError;
      if (e instanceof UnAuthorizedError) {
        tokenError = res.status(403).json({
          status: res.statusCode,
          error: `${e.name}: ${e.message}`,
        });
      } else if (e instanceof AuthenticationError) {
        tokenError = res.status(401).json({
          status: res.statusCode,
          error: `${e.name}: ${e.message}`,
        });
      }
      return tokenError;
    }
  }
}
export default Token;
