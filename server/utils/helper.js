import Joi from 'joi';
import users from '../model/users';
import messages from '../model/message';
import inbox from '../model/inbox';
import sent from '../model/sent';
import {
  firstnameSchema,
  lastnameSchema,
  emailSchema,
  passwordSchema,
  cpasswordSchema,
} from './userValidationSchemas';

import {
  createdOnSchema,
  subjectSchema,
  statusSchema,
  messageSchema,
  parentMessageIdSchema,
  recipientsSchema,
} from './messageValidationSchemas';

class HelperUtils {
  /**
   * @function registerUserValidation - validates the user registration schema object passed to it
   * @param {object} req - request object
   * @param {object} res - response object
   * @returns {object} errors
   *
   * */

  static registerUserValidation(req) {
    const firstnameResult = Joi.validate({ firstname: req.body.firstname }, firstnameSchema);
    const lastnameResult = Joi.validate({ lastname: req.body.lastname }, lastnameSchema);
    const emailResult = Joi.validate({ email: req.body.email }, emailSchema);
    const passwordResult = Joi.validate({ password: req.body.password }, passwordSchema);
    const cpasswordResult = Joi.validate(
      { confirmpassword: req.body.confirmpassword },
      cpasswordSchema,
    );
    const errors = {};
    if (firstnameResult.error !== null) {
      errors.firstname = 'Firstname should be of type string and has a minimum of 2 characters and maximum of 50 chracters';
    }

    if (lastnameResult.error !== null) {
      errors.lastname = 'Lastname should be of type string and has a minimum of 2 and maximum of 50 characters';
    }

    if (emailResult.error !== null) {
      errors.email = 'A valid email type should be provided';
    }
    if (passwordResult.error !== null) {
      errors.password = 'Password should not be empty';
    }
    if (cpasswordResult.error !== null) {
      errors.confirmpassword = 'confirmPassword should not be empty';
    }
    return errors;
  }

  /**
   * @function messageSchemavalidation - validates the message schema of object passed to it
   * @param {object} req - object
   * @returns {object} errors
   *
   * */

  static messageSchemavalidation(req) {
    const errors = {};
    const createdOnResult = Joi.validate({ createdOn: req.body.createdOn }, createdOnSchema);
    const subjectResult = Joi.validate({ subject: req.body.subject }, subjectSchema);
    const messageResult = Joi.validate({ message: req.body.message }, messageSchema);
    const statusResult = Joi.validate({ status: req.body.status }, statusSchema);
    const parentMessageIdResult = Joi.validate(
      { parentMessageId: req.body.parentMessageId }, parentMessageIdSchema,
    );
    const recipientsResult = Joi.validate({ recipients: req.body.recipients }, recipientsSchema);
    if (createdOnResult.error !== null) {
      errors.createdOn = 'createdOn should not be empty';
    }
    if (subjectResult.error !== null) {
      errors.subject = 'subject should not be empty and must be minimum of 2 to maximum 50 characters';
    }
    if (messageResult.error !== null) {
      errors.message = 'message should not be empty';
    }

    if (statusResult.error !== null) {
      errors.status = 'status should not be empty';
    }

    if (parentMessageIdResult.error !== null) {
      errors.parentMessageId = 'parentMessageId should be an Integer';
    }

    if (recipientsResult.error !== null) {
      errors.recipients = 'recipients should be an array of emails and should not be empty';
    }
    return errors;
  }

  /**
   * @function loginSchemaValidation - validates the login schema object passed to it
   * @param {object} req - object
   * @returns {object} errors
   *
   * */

  static loginSchemaValidation(req) {
    const errors = {};
    const emailValidation = Joi.validate({ email: req.body.email }, emailSchema);
    const passwordValidation = Joi.validate({ password: req.body.password }, passwordSchema);
    if (emailValidation.error !== null) {
      errors.email = 'A valid email type should be provided';
    }
    if (passwordValidation.error !== null) {
      errors.password = 'Password should not be empty';
    }
    return errors;
  }

  /**
     * @function  validateRecipients - check if a recipient or recipients are registered user(s)
     * @param {object} mailRecipients - object
     * @returns {array} recipients
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

  /**
     * @function  getReceiverIds - get receivers ids
     * @param {array}recipients - recipients emails
     * @returns {array} receiverIds
     *
  */

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

  /**
     * @function  getAllReceivedMessages - get all received messages
     * @param {integer}id - user id
     * @returns {array} data
     *
  */
  static getAllReceivedMessages(id) {
    const data = [];
    inbox.forEach((i) => {
      if (i.receiverId.includes(id)) {
        data.push(messages.find(m => m.id === i.messageId));
      }
    });
    return data;
  }

  /**
     * @function  getAllSentMessages - get all sent messages
     * @param {integer}id - user id
     * @returns {array} data
     *
  */
  static getAllSentMessages(id) {
    const data = [];
    sent.forEach((s) => {
      if (s.senderId === id) {
        data.push(messages.find(m => m.id === s.messageId));
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

  /**
     * @function  getUserInSession - gets user in session
     * @param {object} req - req object
     * @returns {object} userInsession
     *
  */

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

  /**
     * @function  createSentBox - creates a sent data
     * @param {integer} senderId -message's senderId
     * @param {integer}  messageId - the message id
     * @param {string} createdOn - time the message was sent
     * @returns {object}
     *
  */
  static createSentBox(senderId, messageId, createdOn) {
    return {
      senderId,
      messageId,
      createdOn,
    };
  }

  /**
     * @function  createInBox - creates a sent data
     * @param {array} receiverId -message's receiverIds
     * @param {integer}  messageId - the message id
     * @param {string} createdOn - time the message was sent
     * @returns {object}
     *
  */
  static createInBox(receiverId, messageId, createdOn) {
    return {
      receiverId,
      messageId,
      createdOn,
    };
  }
}

export default HelperUtils;
