"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _messageHelper = _interopRequireDefault(require("../utils/messageHelper"));

var _dbConnection = _interopRequireDefault(require("../db/dbConnection"));

var _queries = _interopRequireDefault(require("../utils/queries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var status = ['unread', 'read', 'sent', 'delete'];

var MessageController =
/*#__PURE__*/
function () {
  function MessageController() {
    _classCallCheck(this, MessageController);
  }

  _createClass(MessageController, null, [{
    key: "createMessage",

    /**
       * @function  sendMessage - create/send message
       * @param {object} req - request object
       * @param {object} res - response object
       * @returns {object}
       *
    */
    value: function () {
      var _createMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var id, mD, receiver, sender, receiverName, senderName, _ref, rows, response, createdon, subject, message, parentmessageid, recipient, receiverid, data, messageId, contactQuery, myContacts, contactsIds;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = req.user.id;
                mD = {
                  subject: req.body.subject.trim(),
                  message: req.body.message,
                  recipient: req.body.recipient
                };
                _context.next = 4;
                return _messageHelper["default"].getUser(mD.recipient);

              case 4:
                receiver = _context.sent;
                _context.next = 7;
                return _messageHelper["default"].getMessageSender(id);

              case 7:
                sender = _context.sent;
                receiverName = "".concat(receiver.firstname, " ").concat(receiver.lastname);
                senderName = "".concat(sender.firstname, " ").concat(sender.lastname);
                _context.next = 12;
                return _dbConnection["default"].query(_queries["default"].sendMessageQuery, [mD.subject, mD.message, id, mD.recipient, receiver.id, senderName, receiverName]);

              case 12:
                _ref = _context.sent;
                rows = _ref.rows;
                response = rows[0];
                createdon = response.createdon, subject = response.subject, message = response.message, parentmessageid = response.parentmessageid, recipient = response.recipient, receiverid = response.receiverid;
                data = {
                  id: response.id,
                  createdOn: createdon,
                  subject: subject,
                  message: message,
                  parentMessageId: parentmessageid,
                  senderName: senderName,
                  receiverName: receiverName,
                  recipient: recipient,
                  receiverId: receiverid
                };
                messageId = data.id;
                _context.next = 20;
                return _dbConnection["default"].query(_queries["default"].getContact, [id]);

              case 20:
                contactQuery = _context.sent;

                if (!(contactQuery.rowCount > 0)) {
                  _context.next = 29;
                  break;
                }

                myContacts = contactQuery.rows;
                contactsIds = myContacts.map(function (mc) {
                  return mc.userid;
                });

                if (contactsIds.includes(receiver.id)) {
                  _context.next = 27;
                  break;
                }

                _context.next = 27;
                return _messageHelper["default"].createContact(id, receiver.id, receiver.firstname, receiver.lastname, mD.recipient);

              case 27:
                _context.next = 31;
                break;

              case 29:
                _context.next = 31;
                return _messageHelper["default"].createContact(id, receiver.id, receiver.firstname, receiver.lastname, mD.recipient);

              case 31:
                _context.next = 33;
                return _messageHelper["default"].createSentBox(messageId, data.receiverId, id);

              case 33:
                _context.next = 35;
                return _messageHelper["default"].createInBox(messageId, data.receiverId, id);

              case 35:
                return _context.abrupt("return", res.status(201).json({
                  status: res.statusCode,
                  data: [{
                    message: 'Message sent',
                    data: data
                  }]
                }));

              case 36:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createMessage(_x, _x2) {
        return _createMessage.apply(this, arguments);
      }

      return createMessage;
    }()
    /**
       * @function  getReceivedMessages - get a user's received messages
       * @param {object} req - request object
       * @param {object} res - response object
       * @returns {object}
       *
    */

  }, {
    key: "getReceivedMessages",
    value: function () {
      var _getReceivedMessages = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var id, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = req.user.id;
                _context2.next = 3;
                return _messageHelper["default"].getAllUserReceivedMessages(id);

              case 3:
                data = _context2.sent;
                return _context2.abrupt("return", res.status(200).json({
                  status: res.statusCode,
                  data: [{
                    message: 'inbox messages retrieved',
                    data: data
                  }]
                }));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getReceivedMessages(_x3, _x4) {
        return _getReceivedMessages.apply(this, arguments);
      }

      return getReceivedMessages;
    }()
    /**
       * @function  getUnreadMessages - get a user's  unread messages
       * @param {object} req - request object
       * @param {object} res - response object
       * @returns {object}
       *
    */

  }, {
    key: "getUnreadMessages",
    value: function () {
      var _getUnreadMessages = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var id, data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = req.user.id;
                _context3.next = 3;
                return _messageHelper["default"].getAllUserUnreadMessages(id);

              case 3:
                data = _context3.sent;

                if (!(data === 'Your inbox is empty')) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return", res.status(200).json({
                  message: data
                }));

              case 6:
                return _context3.abrupt("return", res.status(200).json({
                  status: res.statusCode,
                  data: [{
                    message: 'unread messages retrieved',
                    data: data
                  }]
                }));

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getUnreadMessages(_x5, _x6) {
        return _getUnreadMessages.apply(this, arguments);
      }

      return getUnreadMessages;
    }()
    /**
       * @function  getSentMessages - get a user's sent messages
       * @param {object} req - request object
       * @param {object} res - response object
       * @returns {object}
       *
    */

  }, {
    key: "getSentMessages",
    value: function () {
      var _getSentMessages = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var id, data;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = req.user.id;
                _context4.next = 3;
                return _messageHelper["default"].getAllUserSentMessages(id);

              case 3:
                data = _context4.sent;
                return _context4.abrupt("return", res.status(200).json({
                  status: res.statusCode,
                  data: [{
                    message: 'sent messages retrieved',
                    data: data
                  }]
                }));

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getSentMessages(_x7, _x8) {
        return _getSentMessages.apply(this, arguments);
      }

      return getSentMessages;
    }()
    /**
       * @function  getAMessage - get a user's specific message
       * @param {object} req - request object
       * @param {object} res - response object
       * @returns {object}
       *
    */

  }, {
    key: "getAMessage",
    value: function () {
      var _getAMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var id, messageId, inboxMsg, sentMsg, messageid, _ref2, rows, data, _ref3, _rows, _data;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = req.user.id;
                messageId = parseInt(req.params.id, 10);
                _context5.next = 4;
                return _messageHelper["default"].getAninbox(messageId, id);

              case 4:
                inboxMsg = _context5.sent;
                _context5.next = 7;
                return _messageHelper["default"].getASentbox(messageId, id, status[2]);

              case 7:
                sentMsg = _context5.sent;

                if (!(inboxMsg !== undefined)) {
                  _context5.next = 20;
                  break;
                }

                if (!(inboxMsg.status !== status[3])) {
                  _context5.next = 20;
                  break;
                }

                messageid = inboxMsg.messageid;
                _context5.next = 13;
                return _dbConnection["default"].query(_queries["default"].getAnInboxMessageQuery, [messageid, id]);

              case 13:
                _ref2 = _context5.sent;
                rows = _ref2.rows;
                data = rows[0];

                if (!(data !== undefined)) {
                  _context5.next = 20;
                  break;
                }

                _context5.next = 19;
                return _messageHelper["default"].updateStatus(status[1], data.id, id);

              case 19:
                return _context5.abrupt("return", res.status(200).json({
                  status: res.statusCode,
                  data: [{
                    message: 'message retrieved',
                    data: data
                  }]
                }));

              case 20:
                if (!(sentMsg !== undefined)) {
                  _context5.next = 29;
                  break;
                }

                if (!(sentMsg.status !== status[3])) {
                  _context5.next = 29;
                  break;
                }

                _context5.next = 24;
                return _dbConnection["default"].query(_queries["default"].getASentboxMessageQuery, [sentMsg.messageid, id]);

              case 24:
                _ref3 = _context5.sent;
                _rows = _ref3.rows;
                _data = _rows[0];

                if (!(_data !== undefined)) {
                  _context5.next = 29;
                  break;
                }

                return _context5.abrupt("return", res.status(200).json({
                  status: res.statusCode,
                  data: [{
                    message: 'message retrieved',
                    data: _data
                  }]
                }));

              case 29:
                return _context5.abrupt("return", res.status(404).json({
                  status: res.statusCode,
                  error: 'no such message was found'
                }));

              case 30:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function getAMessage(_x9, _x10) {
        return _getAMessage.apply(this, arguments);
      }

      return getAMessage;
    }()
    /**
       * @function deleteAMessage - deletes a user's specific message
       * @param {object} req - request object
       * @param {object} res - response object
       * @returns {object}
       *
    */

  }, {
    key: "deleteAMessage",
    value: function () {
      var _deleteAMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(req, res) {
        var id, messageId, inboxMsg, sentMsg;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                id = req.user.id;
                messageId = parseInt(req.params.id, 10);
                _context6.next = 4;
                return _messageHelper["default"].getAninbox(messageId, id);

              case 4:
                inboxMsg = _context6.sent;
                _context6.next = 7;
                return _messageHelper["default"].getASentbox(messageId, id, status[2]);

              case 7:
                sentMsg = _context6.sent;

                if (!(inboxMsg !== undefined && sentMsg !== undefined)) {
                  _context6.next = 14;
                  break;
                }

                _context6.next = 11;
                return _dbConnection["default"].query(_queries["default"].DeleteSentbox, [status[3], messageId, id]);

              case 11:
                _context6.next = 13;
                return _dbConnection["default"].query(_queries["default"].DeleteInbox, [status[3], messageId, id]);

              case 13:
                return _context6.abrupt("return", res.status(200).json({
                  status: res.statusCode,
                  data: [{
                    message: 'message deleted'
                  }]
                }));

              case 14:
                if (!(inboxMsg !== undefined)) {
                  _context6.next = 19;
                  break;
                }

                if (!(inboxMsg.status !== status[3])) {
                  _context6.next = 19;
                  break;
                }

                _context6.next = 18;
                return _dbConnection["default"].query(_queries["default"].DeleteInbox, [status[3], messageId, id]);

              case 18:
                return _context6.abrupt("return", res.status(200).json({
                  status: res.statusCode,
                  data: [{
                    message: 'message deleted'
                  }]
                }));

              case 19:
                if (!(sentMsg !== undefined)) {
                  _context6.next = 24;
                  break;
                }

                if (!(sentMsg.status !== status[3])) {
                  _context6.next = 24;
                  break;
                }

                _context6.next = 23;
                return _dbConnection["default"].query(_queries["default"].DeleteSentbox, [status[3], messageId, id]);

              case 23:
                return _context6.abrupt("return", res.status(200).json({
                  status: res.statusCode,
                  data: [{
                    message: 'message deleted'
                  }]
                }));

              case 24:
                return _context6.abrupt("return", res.status(404).json({
                  status: res.statusCode,
                  error: 'no such message was found'
                }));

              case 25:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function deleteAMessage(_x11, _x12) {
        return _deleteAMessage.apply(this, arguments);
      }

      return deleteAMessage;
    }()
  }]);

  return MessageController;
}();

var _default = MessageController;
exports["default"] = _default;