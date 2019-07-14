"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _dbConnection = _interopRequireDefault(require("../db/dbConnection"));

var _messageHelper = _interopRequireDefault(require("../utils/messageHelper"));

var _validationHelper = _interopRequireDefault(require("../utils/validationHelper"));

var _queries = _interopRequireDefault(require("../utils/queries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: "registerUser",

    /**
      * @function registerUser - creates a user
      * @param {object} req - request object
      * @param {object} res - response object
      * @returns {object} json data
    */
    value: function () {
      var _registerUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var rD, encryptedPassword, encryptedcPassword, _ref, rows, authUser, firstname, lastname, id, user, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                rD = {
                  firstName: req.body.firstName.trim(),
                  lastName: req.body.lastName.trim(),
                  email: req.body.email.trim(),
                  password: req.body.password.trim(),
                  confirmPassword: req.body.confirmPassword.trim()
                };
                encryptedPassword = _validationHelper["default"].hidePassword(rD.password);
                encryptedcPassword = _validationHelper["default"].hidePassword(rD.confirmPassword);
                _context.next = 5;
                return _dbConnection["default"].query(_queries["default"].registerUserQuery, [rD.firstName, rD.lastName, rD.email, encryptedPassword, encryptedcPassword]);

              case 5:
                _ref = _context.sent;
                rows = _ref.rows;
                authUser = rows[0];
                firstname = authUser.firstname, lastname = authUser.lastname, id = authUser.id;
                user = {
                  firstname: firstname,
                  lastname: lastname
                };
                token = _messageHelper["default"].generateToken({
                  id: id
                });
                return _context.abrupt("return", res.status(201).json({
                  status: res.statusCode,
                  data: [{
                    token: token,
                    message: 'Account created successfully',
                    user: user
                  }]
                }));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function registerUser(_x, _x2) {
        return _registerUser.apply(this, arguments);
      }

      return registerUser;
    }()
    /**
      * @function loginUser - log's in a user
      * @param {object} req - request object
      * @param {object} res - response object
      * @returns {object} json data
    */

  }, {
    key: "loginUser",
    value: function () {
      var _loginUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _ref2, rows, authUser, id, firstname, lastname, payload, user, token;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _dbConnection["default"].query(_queries["default"].loginQuery, [req.body.email.trim()]);

              case 2:
                _ref2 = _context2.sent;
                rows = _ref2.rows;
                authUser = rows[0];
                id = authUser.id, firstname = authUser.firstname, lastname = authUser.lastname;
                payload = {
                  id: id
                };
                user = {
                  firstname: firstname,
                  lastname: lastname
                };
                token = _messageHelper["default"].generateToken(payload);
                return _context2.abrupt("return", res.status(200).json({
                  status: res.statusCode,
                  data: [{
                    message: 'login was successful',
                    token: token,
                    user: user
                  }]
                }));

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function loginUser(_x3, _x4) {
        return _loginUser.apply(this, arguments);
      }

      return loginUser;
    }()
  }]);

  return UserController;
}();

var _default = UserController;
exports["default"] = _default;