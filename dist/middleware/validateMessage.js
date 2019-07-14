"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validationHelper = _interopRequireDefault(require("../utils/validationHelper"));

var _messageHelper = _interopRequireDefault(require("../utils/messageHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ValidateMessage =
/*#__PURE__*/
function () {
  function ValidateMessage() {
    _classCallCheck(this, ValidateMessage);
  }

  _createClass(ValidateMessage, null, [{
    key: "validateMessageData",

    /**
       * @function  validateMessageData - check for input validation before creating a message
       * @param {object} req - request object
       * @param {object} res - response object
       * @returns {function} next
       *
    */
    value: function validateMessageData(req, res, next) {
      var errors = _validationHelper["default"].messageSchemavalidation(req);

      if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
        return res.status(400).json({
          status: res.statusCode,
          errors: errors
        });
      }

      return next();
    }
    /**
       * @function  validateRecipient - check if a recipient or recipients are registered user(s)
       * @param {object} mailRecipients - object
       * @returns {array}
       *
    */

  }, {
    key: "validateRecipient",
    value: function () {
      var _validateRecipient = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var mailRecipient, user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                mailRecipient = req.body.recipient;
                _context.next = 3;
                return _messageHelper["default"].getUser(mailRecipient);

              case 3:
                user = _context.sent;

                if (user) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", res.status(404).json({
                  status: res.statusCode,
                  error: 'No registered email was found'
                }));

              case 6:
                return _context.abrupt("return", next());

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function validateRecipient(_x, _x2, _x3) {
        return _validateRecipient.apply(this, arguments);
      }

      return validateRecipient;
    }()
  }, {
    key: "validateIdparams",
    value: function validateIdparams(req, res, next) {
      if (Number.isNaN(Number(req.params.id))) {
        return res.status(400).json({
          status: 400,
          error: 'The id parameter must be a number'
        });
      }

      return next();
    }
  }, {
    key: "validategroupId",
    value: function validategroupId(req, res, next) {
      if (Number.isNaN(Number(req.params.groupid))) {
        return res.status(400).json({
          status: 400,
          error: 'The id parameter must be a number'
        });
      }

      return next();
    }
  }]);

  return ValidateMessage;
}();

var _default = ValidateMessage;
exports["default"] = _default;