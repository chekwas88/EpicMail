"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _dbConnection = _interopRequireDefault(require("../db/dbConnection"));

var _queries = _interopRequireDefault(require("./queries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var secret = process.env.SECRET_KEY;

var MessageUtils =
/*#__PURE__*/
function () {
  function MessageUtils() {
    _classCallCheck(this, MessageUtils);
  }

  _createClass(MessageUtils, null, [{
    key: "getUser",

    /**
       * @function  getUser - gets a user
       * @param {object} email - user email
       * @returns {object}
       *
    */
    value: function () {
      var _getUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(email) {
        var _ref, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _dbConnection["default"].query(_queries["default"].loginQuery, [email]);

              case 2:
                _ref = _context.sent;
                rows = _ref.rows;
                return _context.abrupt("return", rows[0]);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getUser(_x) {
        return _getUser.apply(this, arguments);
      }

      return getUser;
    }()
    /**
       * @function  getUserById - gets a user
       * @param {object} email - user email
       * @returns {object}
       *
    */

  }, {
    key: "getUserById",
    value: function () {
      var _getUserById = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(id) {
        var _ref2, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _dbConnection["default"].query(_queries["default"].getUserById, [id]);

              case 2:
                _ref2 = _context2.sent;
                rows = _ref2.rows;
                return _context2.abrupt("return", rows[0]);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getUserById(_x2) {
        return _getUserById.apply(this, arguments);
      }

      return getUserById;
    }()
    /**
       * @function  getMessageSender - gets message sender
       * @param {object} id - sender Id
       * @returns {object}
       *
    */

  }, {
    key: "getMessageSender",
    value: function () {
      var _getMessageSender = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(id) {
        var _ref3, rows;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _dbConnection["default"].query(_queries["default"].messenger, [id]);

              case 2:
                _ref3 = _context3.sent;
                rows = _ref3.rows;
                return _context3.abrupt("return", rows[0]);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getMessageSender(_x3) {
        return _getMessageSender.apply(this, arguments);
      }

      return getMessageSender;
    }()
    /**
       * @function  getReceiverIds - get receivers ids
       * @param {array}recipients - recipients emails
       * @returns {array} receiverIds
       *
    */

  }, {
    key: "getusers",
    value: function () {
      var _getusers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var _ref4, rows, users;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _dbConnection["default"].query(_queries["default"].allUserQ);

              case 2:
                _ref4 = _context4.sent;
                rows = _ref4.rows;
                users = rows;
                return _context4.abrupt("return", users);

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getusers() {
        return _getusers.apply(this, arguments);
      }

      return getusers;
    }()
    /**
     * @function  checkInbox - get all inbox of a user
     * @param {integer}id - user id
     * @returns {array}
     *
    */

  }, {
    key: "checkInbox",
    value: function () {
      var _checkInbox = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(id) {
        var box;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _dbConnection["default"].query(_queries["default"].getAllInbox, [id]);

              case 2:
                box = _context5.sent;
                return _context5.abrupt("return", box.rows);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function checkInbox(_x4) {
        return _checkInbox.apply(this, arguments);
      }

      return checkInbox;
    }()
    /**
     * @function  getAnIbox - returns an inbox of a user
     * @param {integer}id - user id
     * @returns {array}
     *
    */

  }, {
    key: "getAninbox",
    value: function () {
      var _getAninbox = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(messageid, id) {
        var box;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _dbConnection["default"].query(_queries["default"].getAnIbox, [messageid, id]);

              case 2:
                box = _context6.sent;
                return _context6.abrupt("return", box.rows[0]);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function getAninbox(_x5, _x6) {
        return _getAninbox.apply(this, arguments);
      }

      return getAninbox;
    }()
    /**
     * @function  getASentbox - returns a sentbox of a user
     * @param {integer}id - user id
     * @returns {array}
     *
    */

  }, {
    key: "getASentbox",
    value: function () {
      var _getASentbox = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(messageid, id, status) {
        var box;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _dbConnection["default"].query(_queries["default"].getASentbox, [messageid, id, status]);

              case 2:
                box = _context7.sent;
                return _context7.abrupt("return", box.rows[0]);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function getASentbox(_x7, _x8, _x9) {
        return _getASentbox.apply(this, arguments);
      }

      return getASentbox;
    }()
    /**
       * @function  getAllReceivedMessages - get all received messages
       * @param {objec} res
       *  @param {integer}id - user id
       * @returns {array} data
       *
    */

  }, {
    key: "getAllUserReceivedMessages",
    value: function () {
      var _getAllUserReceivedMessages = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(id) {
        var inboxMsg, msg, msgIds, _ref5, rows, messages, data;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return MessageUtils.checkInbox(id);

              case 2:
                inboxMsg = _context8.sent;

                if (!(inboxMsg.length === 0 || inboxMsg === undefined)) {
                  _context8.next = 5;
                  break;
                }

                return _context8.abrupt("return", 'Your inbox is empty');

              case 5:
                msg = inboxMsg.filter(function (i) {
                  return i.status !== 'delete';
                });

                if (!(msg.length === 0 || msg === undefined)) {
                  _context8.next = 8;
                  break;
                }

                return _context8.abrupt("return", 'Your inbox is empty');

              case 8:
                msgIds = msg.map(function (i) {
                  return i.messageid;
                });
                _context8.next = 11;
                return _dbConnection["default"].query(_queries["default"].allMessages);

              case 11:
                _ref5 = _context8.sent;
                rows = _ref5.rows;
                messages = rows;
                data = [];
                messages.forEach(function (m) {
                  if (msgIds.includes(m.id)) {
                    data.push(m);
                  }
                });
                return _context8.abrupt("return", data);

              case 17:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function getAllUserReceivedMessages(_x10) {
        return _getAllUserReceivedMessages.apply(this, arguments);
      }

      return getAllUserReceivedMessages;
    }()
  }, {
    key: "getAllUserUnreadMessages",
    value: function () {
      var _getAllUserUnreadMessages = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(id) {
        var inboxMsg, msg, msgIds, _ref6, rows, messages, data;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return MessageUtils.checkInbox(id);

              case 2:
                inboxMsg = _context9.sent;

                if (!(inboxMsg.length === 0 || inboxMsg === undefined)) {
                  _context9.next = 5;
                  break;
                }

                return _context9.abrupt("return", 'Your inbox is empty');

              case 5:
                msg = inboxMsg.filter(function (i) {
                  return i.status === 'unread';
                });

                if (!(msg.length === 0 || msg === undefined)) {
                  _context9.next = 8;
                  break;
                }

                return _context9.abrupt("return", 'Your inbox is empty');

              case 8:
                msgIds = msg.map(function (i) {
                  return i.messageid;
                });
                _context9.next = 11;
                return _dbConnection["default"].query(_queries["default"].allMessages);

              case 11:
                _ref6 = _context9.sent;
                rows = _ref6.rows;
                messages = rows;
                data = [];
                messages.forEach(function (m) {
                  if (msgIds.includes(m.id)) {
                    data.push(m);
                  }
                });
                return _context9.abrupt("return", data);

              case 17:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function getAllUserUnreadMessages(_x11) {
        return _getAllUserUnreadMessages.apply(this, arguments);
      }

      return getAllUserUnreadMessages;
    }()
    /**
       * @function  getAllUserSentMessages - get all sent messages
       * @param {integer}id - user id
       * @returns {array} data
       *
    */

  }, {
    key: "getAllUserSentMessages",
    value: function () {
      var _getAllUserSentMessages = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(id) {
        var sentbox, msg, msgIds, _ref7, rows, messages, data;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return MessageUtils.getAllSentbox(id);

              case 2:
                sentbox = _context10.sent;

                if (!(sentbox.length === 0 || sentbox === undefined)) {
                  _context10.next = 5;
                  break;
                }

                return _context10.abrupt("return", 'No sent messages');

              case 5:
                msg = sentbox.filter(function (s) {
                  return s.status !== 'delete';
                });

                if (!(msg.length === 0 || msg === undefined)) {
                  _context10.next = 8;
                  break;
                }

                return _context10.abrupt("return", 'No sent Messages');

              case 8:
                msgIds = msg.map(function (i) {
                  return i.messageid;
                });
                _context10.next = 11;
                return _dbConnection["default"].query(_queries["default"].allMessages);

              case 11:
                _ref7 = _context10.sent;
                rows = _ref7.rows;
                messages = rows;
                data = [];
                messages.forEach(function (m) {
                  if (msgIds.includes(m.id)) {
                    data.push(m);
                  }
                });
                return _context10.abrupt("return", data);

              case 17:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function getAllUserSentMessages(_x12) {
        return _getAllUserSentMessages.apply(this, arguments);
      }

      return getAllUserSentMessages;
    }()
    /**
       * @function  getAllSentbox - get all sentbox of a user
       * @param {integer}id - user id
       * @returns {array} data
       *
    */

  }, {
    key: "getAllSentbox",
    value: function () {
      var _getAllSentbox = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11(id) {
        var sentbox;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return _dbConnection["default"].query(_queries["default"].getAllSentBox, ['sent', id]);

              case 2:
                sentbox = _context11.sent;
                return _context11.abrupt("return", sentbox.rows);

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function getAllSentbox(_x13) {
        return _getAllSentbox.apply(this, arguments);
      }

      return getAllSentbox;
    }()
    /**
       * @function  generateToken - generates token.
       * @returns {String} token
       *
    */

  }, {
    key: "generateToken",
    value: function generateToken(payload) {
      var token = _jsonwebtoken["default"].sign(payload, secret, {
        expiresIn: '1 day'
      });

      return token;
    }
    /**
       * @function  createSentBox - creates a sent data
       * @param {integer}  messageId - the message id
       * @param {integer} receiverId - message's receiverId
       * @param {integer}  senderId - message's senderId
       * @returns {object}
       *
    */

  }, {
    key: "createSentBox",
    value: function () {
      var _createSentBox = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee12(messageId, receiverId, senderId) {
        var _ref8, rows;

        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return _dbConnection["default"].query(_queries["default"].addSent, [messageId, receiverId, senderId]);

              case 2:
                _ref8 = _context12.sent;
                rows = _ref8.rows;
                return _context12.abrupt("return", rows);

              case 5:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      function createSentBox(_x14, _x15, _x16) {
        return _createSentBox.apply(this, arguments);
      }

      return createSentBox;
    }()
    /**
       * @function  createInBox - creates a sent data
       * @param {integer}  messageId - the message id
       * @param {array} receiverId - message's receiverId
       * @param {integer}  senderId - the message's SenderId
       * @returns {object}
       *
    */

  }, {
    key: "createInBox",
    value: function () {
      var _createInBox = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee13(messageId, receiverId, senderId) {
        var _ref9, rows;

        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return _dbConnection["default"].query(_queries["default"].addInbox, [messageId, receiverId, senderId]);

              case 2:
                _ref9 = _context13.sent;
                rows = _ref9.rows;
                return _context13.abrupt("return", rows);

              case 5:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }));

      function createInBox(_x17, _x18, _x19) {
        return _createInBox.apply(this, arguments);
      }

      return createInBox;
    }()
    /**
       * @function  createContact - creates a contact
       * @param {integer} ownerId - contact's owner's id
       * @param {integer} userid- contact's user id
       * @param {string} firstname -contact's firstname
       * @param {string}  lastname - contact's lastname
       * @param {string}  email - contact's email
       * @returns {object}
       *
    */

  }, {
    key: "createContact",
    value: function () {
      var _createContact = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee14(ownerId, userId, firstname, lastname, email) {
        var _ref10, rows;

        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return _dbConnection["default"].query(_queries["default"].addContact, [ownerId, userId, firstname, lastname, email]);

              case 2:
                _ref10 = _context14.sent;
                rows = _ref10.rows;
                return _context14.abrupt("return", rows);

              case 5:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }));

      function createContact(_x20, _x21, _x22, _x23, _x24) {
        return _createContact.apply(this, arguments);
      }

      return createContact;
    }()
    /**
       * @function  updateStatus - updates status of message
       * @param {string} status - inboox status
       * @param {integer}  messageId - the message id
       * @param {integer} id -message's receiverIds
       * @returns {object}
       *
    */

  }, {
    key: "updateStatus",
    value: function () {
      var _updateStatus = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee15(status, messageId, id) {
        var _ref11, rows;

        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return _dbConnection["default"].query(_queries["default"].updateStatusQ, [status, messageId, id]);

              case 2:
                _ref11 = _context15.sent;
                rows = _ref11.rows;
                return _context15.abrupt("return", rows[0]);

              case 5:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      }));

      function updateStatus(_x25, _x26, _x27) {
        return _updateStatus.apply(this, arguments);
      }

      return updateStatus;
    }()
  }, {
    key: "sendToGroup",
    value: function () {
      var _sendToGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee16(id, subject, message, recipient, receiverid, senderName, receiverName) {
        var _ref12, rows, data, rId, messageid;

        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return _dbConnection["default"].query(_queries["default"].sendMessageQuery, [subject, message, id, recipient, receiverid, senderName, receiverName]);

              case 2:
                _ref12 = _context16.sent;
                rows = _ref12.rows;
                data = rows[0];
                rId = data.receiverid;
                messageid = data.id;
                _context16.next = 9;
                return MessageUtils.createSentBox(messageid, rId, id);

              case 9:
                _context16.next = 11;
                return MessageUtils.createInBox(messageid, rId, id);

              case 11:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
      }));

      function sendToGroup(_x28, _x29, _x30, _x31, _x32, _x33, _x34) {
        return _sendToGroup.apply(this, arguments);
      }

      return sendToGroup;
    }()
  }]);

  return MessageUtils;
}();

var _default = MessageUtils;
exports["default"] = _default;