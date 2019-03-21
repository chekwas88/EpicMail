
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../db/dbConnection';
import queries from './queries';

dotenv.config();
const secret = process.env.SECRET_KEY;

class MessageUtils {
  /**
     * @function  getUser - validates password
     * @param {object} req - request object
     * @returns {object}
     *
  */

  static async getUser(email) {
    const { rows } = await pool.query(queries.loginQuery, [email]);
    return rows[0];
  }

  /**
     * @function  getReceiverIds - get receivers ids
     * @param {array}recipients - recipients emails
     * @returns {array} receiverIds
     *
  */

  static async getusers() {
    const { rows } = await pool.query(queries.allUserQ);
    const users = rows;
    return users;
  }


  /**
   * @function  checkInbox - get all inbox of a user
   * @param {integer}id - user id
   * @returns {array}
   *
*/
  static async checkInbox(id) {
    const box = await pool.query(queries.getAllInbox, [id]);
    return box.rows;
  }

  /**
   * @function  getAnIbox - returns an inbox of a user
   * @param {integer}id - user id
   * @returns {array}
   *
*/

  static async getAninbox(messageid, id) {
    const box = await pool.query(queries.getAnIbox, [messageid, id]);
    return box.rows[0];
  }

  /**
   * @function  getASentbox - returns a sentbox of a user
   * @param {integer}id - user id
   * @returns {array}
   *
*/

  static async getASentbox(messageid, id, status) {
    const box = await pool.query(queries.getASentbox, [messageid, id, status]);
    return box.rows[0];
  }

  /**
     * @function  getAllReceivedMessages - get all received messages
     * @param {objec} res
     *  @param {integer}id - user id
     * @returns {array} data
     *
  */
  static async getAllUserReceivedMessages(id) {
    const inboxMsg = await MessageUtils.checkInbox(id);
    if (inboxMsg.length === 0 || inboxMsg === undefined) {
      return 'Your inbox is empty';
    }
    const msg = inboxMsg.filter(i => i.status !== 'delete');
    if (msg.length === 0 || msg === undefined) {
      return 'Your inbox is empty';
    }
    const msgIds = msg.map(i => i.messageid);
    const { rows } = await pool.query(queries.allMessages);
    const messages = rows;
    const data = [];
    messages.forEach((m) => {
      if (msgIds.includes(m.id)) {
        data.push(m);
      }
    });
    return data;
  }

  static async getAllUserUnreadMessages(id) {
    const inboxMsg = await MessageUtils.checkInbox(id);
    if (inboxMsg.length === 0 || inboxMsg === undefined) {
      return 'Your inbox is empty';
    }
    const msg = inboxMsg.filter(i => i.status === 'unread');
    if (msg.length === 0 || msg === undefined) {
      return 'Your inbox is empty';
    }
    const msgIds = msg.map(i => i.messageid);
    const { rows } = await pool.query(queries.allMessages);
    const messages = rows;
    const data = [];
    messages.forEach((m) => {
      if (msgIds.includes(m.id)) {
        data.push(m);
      }
    });
    return data;
  }

  static async getAllUserSentMessages(id) {
    const sentbox = await MessageUtils.getAllSentbox(id);
    if (sentbox.length === 0 || sentbox === undefined) {
      return 'No sent messages';
    }
    const msgIds = sentbox.map(i => i.messageid);
    const { rows } = await pool.query(queries.allMessages);
    const messages = rows;
    const data = [];
    messages.forEach((m) => {
      if (msgIds.includes(m.id)) {
        data.push(m);
      }
    });
    return data;
  }

  /**
   * @function  getAllInbox - get all inbox of a user
   * @param {integer}id - user id
   * @returns {array} data
   *
*/
  static async getAllUnread(status, id) {
    const unreadMsg = await pool.query(queries.getAllUnread, ['unread', id]);
    return unreadMsg.rows;
  }

  /**
     * @function  getAllSentMessages - get all sent messages
     * @param {integer}id - user id
     * @returns {array} data
     *
  */
  static async getAllSentMessages(id) {
    const sentbox = await pool.query(queries.getUserSentMessagesQ, [id]);
    return sentbox.rows;
  }

  /**
     * @function  getAllSentbox - get all sentbox of a user
     * @param {integer}id - user id
     * @returns {array} data
     *
  */
  static async getAllSentbox(id) {
    const sentbox = await pool.query(queries.getAllSentBox, ['sent', id]);
    return sentbox.rows;
  }

  /**
     * @function  generateToken - generates token.
     * @returns {String} token
     *
  */
  static generateToken(payload) {
    const token = jwt.sign(payload, secret, { expiresIn: '1 day' });
    return token;
  }

  /**
     * @function  createSentBox - creates a sent data
     * @param {integer} senderId -message's senderId
     * @param {integer}  messageId - the message id
     * @returns {object}
     *
  */
  static async createSentBox(messageId, receiverId, senderId) {
    const { rows } = await pool.query(queries.addSent, [messageId, receiverId, senderId]);
    return rows;
  }

  /**
     * @function  createInBox - creates a sent data
     * @param {array} receiverId -message's receiverIds
     * @param {integer}  messageId - the message id
     * @returns {object}
     *
  */
  static async createInBox(messageId, receiverId, senderId) {
    const { rows } = await pool.query(queries.addInbox, [messageId, receiverId, senderId]);
    return rows;
  }

  /**
     * @function  updateStatus - updates status of message
     * @param {array} stat -message's receiverIds
     * @param {integer}  messageId - the message id
     * @returns {object}
     *
  */
  static async updateStatus(status, messageId, id) {
    const { rows } = await pool.query(queries.updateStatusQ, [status, messageId, id]);
    return rows[0];
  }

  static async sendToGroup(id, subject, message, recipient, receiverid) {
    const { rows } = await pool.query(
      queries.sendMessageQuery, [subject, message, id, recipient, receiverid],
    );
    const data = rows[0];
    const rId = data.receiverid;
    const messageid = data.id;
    await MessageUtils.createSentBox(messageid, rId, id);
    await MessageUtils.createInBox(messageid, rId, id);
  }
}

export default MessageUtils;
