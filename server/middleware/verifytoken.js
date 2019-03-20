import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET_KEY;

class Token {
  static verifyToken(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(403).json({
        status: res.statusCode,
        error: 'No authorization is provided',
      });
    }
    const token = req.headers.authorization.split(' ')[1];
    return jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: res.statusCode,
          error: 'token not verified',
        });
      }
      req.user = decoded;
      return next();
    });
  }
}
export default Token;
