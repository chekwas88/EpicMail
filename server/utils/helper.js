import Joi from 'joi';
import error from './error';
import users from '../model/users';
import messages from '../model/message';
import inbox from '../model/inbox';
// import sent from '../model/sent';

const { BadRequestError } = error;

class HelperUtils {
  /**
   * @function schemaValidation - validates the schema of object passed to it
   * @param {object} req - request object
   * @param {object} res - response object
   * @returns {function} next
   *
   * */
  static schemaValidation(req, schema, res, next) {
    const result = Joi.validate(req.body, schema);
    try {
      if (result.error !== null) {
        throw new BadRequestError(result.error.details[0].message);
      }
      return next();
    } catch (e) {
      return res.status(400).json({
        status: res.statusCode,
        error: `${e.name}: ${e.message}`,
      });
    }
  }

  /**
     * @function  validateRecipients - check if a recipient or recipients are registered user(s)
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {function} next
     *
  */
  static validateRecipients(mailRecipients) {
    const registeredRecipients = users.map(m => m.email);
    const recipients = [];
    mailRecipients.forEach((recipient) => {
      if (registeredRecipients.includes(recipient)) {
        recipients.push(recipient);
      }
    });
    return recipients;
  }

  static getReceiverIds(recipients) {
    const receiverIds = [];
    const potentialIds = [];
    recipients.forEach((recipient) => {
      const potentialUsers = users.filter(u => u.email === recipient);
      potentialIds.push(potentialUsers[0]);
    });
    for (let i = 0; i < potentialIds.length; i += 1) {
      receiverIds.push(potentialIds[i].id);
    }
    return receiverIds;
  }

  static getAllReceivedMessages(id) {
    const data = [];
    inbox.forEach((i) => {
      if (i.receiverId.includes(id)) {
        data.push(messages.find(m => m.id === i.messageId));
      }
    });
    return data;
  }

  static getAllMessages(id) {
    const data = [];
    messages.forEach((i) => {
      if (i.receiverId.includes(id) || i.senderId === id) {
        data.push(messages.find(m => m.id === i.id));
      }
    });
    return data;
  }

  static getUserInSession(req) {
    const token = req.headers.authorization.split(' ')[1];
    const userInsession = users.find(u => u.token === token);
    return userInsession;
  }

  /**
     * @function  generateToken - generates random string NB not jwt. Used as dummy token
     * @returns {String} token
     *
  */
  static generateToken() {
    let token = '';
    const tokenBank = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 7; i += 1) {
      token += tokenBank.charAt(Math.floor(Math.random() * tokenBank.length));
    }
    return token;
  }

  static createSentBox(senderId, messageId, createdOn) {
    return {
      senderId,
      messageId,
      createdOn,
    };
  }

  static createInBox(receiverId, messageId, createdOn) {
    return {
      receiverId,
      messageId,
      createdOn,
    };
  }

  static getAllSentMessages() {
    const receivedMessages = messages.filter(m => m.status === 'sent');
    return receivedMessages;
  }
}


export default HelperUtils;
