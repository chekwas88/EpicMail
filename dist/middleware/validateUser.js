"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _validationHelper = _interopRequireDefault(require("../utils/validationHelper"));

var _dbConnection = _interopRequireDefault(require("../db/dbConnection"));

var _queries = _interopRequireDefault(require("../utils/queries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var Validate =
/*#__PURE__*/
function () {
  function Validate() {
    _classCallCheck(this, Validate);
  }

  _createClass(Validate, null, [{
    key: "validateUserRegData",

    /**
       * @function  validateUserRegData - check for input validation before creating a diary entry
       * @param {object} req - request object
       * @param {object} res - response object
       * @returns {function} next
       *
    */
    value: function validateUserRegData(req, res, next) {
      var errors = _validationHelper["default"].registerUserValidation(req);

      if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
        return res.status(400).json({
          status: res.statusCode,
          errors: errors
        });
      }

      return next();
    }
    /**
       * @function  validateUserLoginData - check for input validation before user login
       * @param {object} req - request object
       * @param {object} res - response object
       * @returns {function} next
       *
    */

  }, {
    key: "validateUserLoginData",
    value: function validateUserLoginData(req, res, next) {
      var errors = _validationHelper["default"].loginSchemaValidation(req);

      if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
        return res.status(400).json({
          status: res.statusCode,
          errors: errors
        });
      }

      return next();
    }
    /**
       * @function  validateUserRegPassword - validates password
       * @param {object} req - request object
       * @param {object} res - response object
       * @returns {function} next
       *
    */

  }, {
    key: "validateUserRegPassword",
    value: function validateUserRegPassword(req, res, next) {
      if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({
          status: res.statusCode,
          error: 'password and confirmpassword should be same'
        });
      }

      return next();
    }
    /**
       * @function  checkEmail - check if email is has been before  registered
       * @param {object} req - request object
       * @param {object} res - response object
       * @returns {function} next
       *
    */

  }, {
    key: "checkEmail",
    value: function checkEmail(req, res, next) {
      _dbConnection["default"].query(_queries["default"].loginQuery, [req.body.email.trim()]).then(function (response) {
        if (response.rows[0]) {
          return res.status(400).json({
            status: res.statusCode,
            error: 'email has been registered before'
          });
        }

        return next();
      });
    }
    /**
       * @function  validateLogin - validates if user exists before login
       * @param {object} req - request object
       * @param {object} res - response object
       * @returns {function} next
       *
    */

  }, {
    key: "validateLogin",
    value: function validateLogin(req, res, next) {
      _dbConnection["default"].query(_queries["default"].loginQuery, [req.body.email.trim()]).then(function (response) {
        var user = response.rows[0];

        if (!user) {
          return res.status(400).json({
            status: res.statusCode,
            error: 'invalid email or password'
          });
        }

        var verifyPassword = _validationHelper["default"].checkPassword(req.body.password, user.password);

        if (!verifyPassword) {
          return res.status(400).json({
            status: res.statusCode,
            error: 'invalid email or password'
          });
        }

        return next();
      });
    }
  }]);

  return Validate;
}();

var _default = Validate;
exports["default"] = _default;