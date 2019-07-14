"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var secret = process.env.SECRET_KEY;

var Token =
/*#__PURE__*/
function () {
  function Token() {
    _classCallCheck(this, Token);
  }

  _createClass(Token, null, [{
    key: "verifyToken",
    value: function verifyToken(req, res, next) {
      if (!req.headers.authorization) {
        return res.status(403).json({
          status: res.statusCode,
          error: 'No authorization is provided'
        });
      }

      var token = req.headers.authorization.split(' ')[1];
      return _jsonwebtoken["default"].verify(token, secret, function (err, decoded) {
        if (err) {
          return res.status(401).json({
            status: res.statusCode,
            error: 'token not verified'
          });
        }

        req.user = decoded;
        return next();
      });
    }
  }]);

  return Token;
}();

var _default = Token;
exports["default"] = _default;