"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dbConnection = _interopRequireDefault(require("../db/dbConnection"));

var _queries = _interopRequireDefault(require("../utils/queries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ContactController =
/*#__PURE__*/
function () {
  function ContactController() {
    _classCallCheck(this, ContactController);
  }

  _createClass(ContactController, null, [{
    key: "getContacts",
    value: function () {
      var _getContacts = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var id, _ref, rows, contacts;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = req.user.id;
                _context.next = 3;
                return _dbConnection["default"].query(_queries["default"].getContact, [id]);

              case 3:
                _ref = _context.sent;
                rows = _ref.rows;
                contacts = rows;

                if (!(contacts.length === 0)) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", res.status(200).json({
                  status: res.statusCode,
                  data: [{
                    message: 'You have no contacts'
                  }]
                }));

              case 8:
                return _context.abrupt("return", res.status(200).json({
                  status: res.statusCode,
                  data: [{
                    message: 'contacts retrieved',
                    contacts: contacts
                  }]
                }));

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getContacts(_x, _x2) {
        return _getContacts.apply(this, arguments);
      }

      return getContacts;
    }()
  }]);

  return ContactController;
}();

var _default = ContactController;
exports["default"] = _default;