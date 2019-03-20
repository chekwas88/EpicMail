'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _messageHelper = require('../utils/messageHelper');

var _messageHelper2 = _interopRequireDefault(_messageHelper);

var _dbConnection = require('../db/dbConnection');

var _dbConnection2 = _interopRequireDefault(_dbConnection);

var _queries = require('../utils/queries');

var _queries2 = _interopRequireDefault(_queries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const status = ['unread', 'read', 'sent', 'delete'];

class MessageController {
  /**
     * @function  sendMessage - create/send message
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {object}
     *
  */
  static async createMessage(req, res) {
    const { id } = req.user;
    const mD = {
      subject: req.body.subject.trim(),
      message: req.body.message,
      recipients: req.body.recipients
    };
    const receiver = await _messageHelper2.default.getUser(mD.recipients);
    const receiverid = receiver.id;
    const { rows } = await _dbConnection2.default.query(_queries2.default.sendMessageQuery, [mD.subject, mD.message, id, mD.recipients, receiverid]);
    const data = rows[0];
    const rId = data.receiverid;
    const messageid = data.id;
    await _messageHelper2.default.createSentBox(messageid, rId, id);
    await _messageHelper2.default.createInBox(messageid, rId, id);
    return res.status(201).json({
      status: res.statusCode,
      data: [{
        data,
        message: 'Message sent'
      }]
    });
  }

  /**
     * @function  getReceivedMessages - get a user's received messages
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {object}
     *
  */
  static async getReceivedMessages(req, res) {
    const { id } = req.user;
    const data = await _messageHelper2.default.getAllUserReceivedMessages(id);
    if (data === 'Your inbox is empty') {
      return res.status(200).json({
        message: data
      });
    }
    return res.status(200).json({
      status: res.statusCode,
      data: [{
        message: 'inbox messages retrieved',
        data
      }]
    });
  }

  /**
     * @function  getUnreadMessages - get a user's  unread messages
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {object}
     *
  */
  static async getUnreadMessages(req, res) {
    const { id } = req.user;
    const data = await _messageHelper2.default.getAllUserUnreadMessages(id);
    if (data === 'Your inbox is empty') {
      return res.status(200).json({
        message: data
      });
    }
    return res.status(200).json({
      status: res.statusCode,
      data: [{
        message: 'unread messages retrieved',
        data
      }]
    });
  }

  /**
     * @function  getSentMessages - get a user's sent messages
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {object}
     *
  */
  static async getSentMessages(req, res) {
    const { id } = req.user;
    const data = await _messageHelper2.default.getAllUserSentMessages(id);
    if (data === 'No sent messages') {
      return res.status(200).json({
        message: data
      });
    }
    return res.status(200).json({
      status: res.statusCode,
      data: [{
        message: 'sent messages retrieved',
        data
      }]
    });
  }

  /**
     * @function  getAMessage - get a user's specific message
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {object}
     *
  */
  static async getAMessage(req, res) {
    const { id } = req.user;
    const messageId = parseInt(req.params.id, 10);
    const inboxMsg = await _messageHelper2.default.getAninbox(messageId, id);
    const sentMsg = await _messageHelper2.default.getASentbox(messageId, id, status[2]);
    if (inboxMsg !== undefined) {
      if (inboxMsg.status !== status[3]) {
        const { messageid } = inboxMsg;
        const { rows } = await _dbConnection2.default.query(_queries2.default.getAnInboxMessageQuery, [messageid, id]);
        const data = rows[0];
        if (data !== undefined) {
          await _messageHelper2.default.updateStatus(status[1], data.id, id);
          return res.status(200).json({
            status: res.statusCode,
            data: [{
              message: 'message retrieved',
              data
            }]
          });
        }
      }
    }
    if (sentMsg !== undefined) {
      const { rows } = await _dbConnection2.default.query(_queries2.default.getASentboxMessageQuery, [sentMsg.messageid, id]);
      const data = rows[0];
      if (data !== undefined) {
        return res.status(200).json({
          status: res.statusCode,
          data: [{
            message: 'message retrieved',
            data
          }]
        });
      }
    }
    return res.status(404).json({
      status: res.statusCode,
      error: 'no such message was found'
    });
  }

  /**
     * @function deleteAMessage - deletes a user's specific message
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {object}
     *
  */
  static async deleteAMessage(req, res) {
    const { id } = req.user;
    const messageId = parseInt(req.params.id, 10);
    const inboxMsg = await _messageHelper2.default.getAninbox(messageId, id);
    const sentMsg = await _messageHelper2.default.getASentbox(messageId, id, status[2]);
    if (inboxMsg !== undefined) {
      if (inboxMsg.status !== status[3]) {
        await _dbConnection2.default.query(_queries2.default.DeleteInbox, [status[3], messageId, id]);
        return res.status(200).json({
          status: res.statusCode,
          data: [{ message: 'message deleted' }]
        });
      }
    }
    if (sentMsg !== undefined) {
      await _dbConnection2.default.query(_queries2.default.DeleteSentbox, [status[3], messageId, id]);
      return res.status(200).json({
        status: res.statusCode,
        data: [{ message: 'message deleted' }]
      });
    }
    return res.status(404).json({
      status: res.statusCode,
      error: 'no such message was found'
    });
  }
}

exports.default = MessageController;