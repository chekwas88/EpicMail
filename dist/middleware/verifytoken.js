'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
const secret = process.env.SECRET_KEY;

class Token {
  static verifyToken(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(403).json({
        status: res.statusCode,
        error: 'No authorization is provided'
      });
    }
    const token = req.headers.authorization.split(' ')[1];
    _jsonwebtoken2.default.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: res.statusCode,
          error: 'token not verified'
        });
      }
      req.user = decoded;
      return req.user;
    });
    return next();
  }
}
exports.default = Token;