import helperUtils from '../utils/helper';
import error from '../utils/error';
import messages from '../model/message';
import inbox from '../model/inbox';
import sent from '../model/sent';
import users from '../model/users';

const { NotFoundError } = error;

class MessageController {
  /**
     * @function  sendMessage - create/send message
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {object}
     *
  */
  static createMessage(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    const userInsession = users.find(u => u.token === token);
    const senderId = userInsession.id;
    const id = messages.length + 1;
    const messageDetails = {
      id,
      createdOn: req.body.createdOn.trim(),
      subject: req.body.subject.trim(),
      message: req.body.message,
      status: req.body.status.trim(),
      senderId,
      recipients: req.body.recipients.trim().split(' '),
    };
    const Authrecipients = helperUtils.validateRecipients(messageDetails.recipients);
    try {
      if (Authrecipients.length === 0) {
        throw new NotFoundError('No registered email address was found');
      }
      messages.push(messageDetails);
      const createdMsg = messages.find(m => m.id === id);
      createdMsg.receiverId = helperUtils.getReceiverIds(Authrecipients);
      createdMsg.status = 'sent';
      const { receiverId, createdOn } = createdMsg;
      const sentboxData = helperUtils.createSentBox(createdMsg.senderId, createdMsg.id, createdOn);
      sent.push(sentboxData);

      createdMsg.status = 'unread';
      const inboxData = helperUtils.createInBox(receiverId, createdMsg.id, createdOn);
      inbox.push(inboxData);
      return res.status(201).json({
        status: res.statusCode,
        data: [
          {
            message: 'Message sent',
          },
        ],
      });
    } catch (e) {
      return res.status(404).json({
        status: res.statusCode,
        error: `${e.name}: ${e.message}`,
      });
    }
  }

  /**
     * @function  getReceivedMessages - get a user's received messages
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {object}
     *
  */
  static getReceivedMessages(req, res) {
    const Insession = helperUtils.getUserInSession(req);
    const { id } = Insession;
    const data = helperUtils.getAllReceivedMessages(id);
    if (data.length === 0) {
      return res.status(200).json({
        status: res.statusCode,
        message: 'Your inbox is empty',
      });
    }
    return res.status(200).json({
      status: res.statusCode,
      data: [
        {
          message: 'inbox messages retrieved',
          data,
        },
      ],
    });
  }

  /**
     * @function  getUnreadMessages - get a user's  unread messages
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {object}
     *
  */
  static getUnreadMessages(req, res) {
    const userInsession = helperUtils.getUserInSession(req);
    const { id } = userInsession;
    const allmsgs = helperUtils.getAllReceivedMessages(id);
    const data = allmsgs.filter(am => am.status === 'unread');
    if (data.length === 0) {
      return res.status(200).json({
        status: res.statusCode,
        message: 'No unread message',
      });
    }
    return res.status(200).json({
      status: res.statusCode,
      data: [
        {
          message: 'unread messages retrieved',
          data,
        },
      ],
    });
  }

  /**
     * @function  getSentMessages - get a user's sent messages
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {object}
     *
  */
  static getSentMessages(req, res) {
    const user = helperUtils.getUserInSession(req);
    const { id } = user;
    const data = helperUtils.getAllSentMessages(id);
    if (data.length === 0) {
      return res.status(200).json({
        status: res.statusCode,
        data: [
          {
            message: 'sent message is empty',
          },
        ],
      });
    }
    return res.status(200).json({
      status: res.statusCode,
      data: [
        {
          message: 'sent messages retrieved',
          data,
        },
      ],
    });
  }

  /**
     * @function  getAMessage - get a user's specific message
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {object}
     *
  */
  static getAMessage(req, res) {
    const insessionUser = helperUtils.getUserInSession(req);
    const { id } = insessionUser;
    const inboxdata = helperUtils.getAllInbox(id);
    const sentbox = helperUtils.getAllSentbox(id);
    let data;
    const inboxmsg = inboxdata.find(i => i.messageId === parseInt(req.params.id, 10));
    const sentboxmsg = sentbox.find(d => d.messageId === parseInt(req.params.id, 10));
    try {
      if (!inboxmsg && !sentboxmsg) {
        throw new NotFoundError('no such message was found');
      }
      if (inboxmsg) {
        const gtmsg = messages.find(m => m.id === inboxmsg.messageId);
        gtmsg.status = 'read';
        data = gtmsg;
      }
      if (sentboxmsg) {
        const stmsg = messages.find(m => m.id === sentboxmsg.messageId);
        data = stmsg;
      }
      return res.status(200).json({
        status: res.statusCode,
        data: [
          {
            message: 'message retrieved',
            data,
          },
        ],
      });
    } catch (e) {
      return res.status(404).json({
        status: res.statusCode,
        error: `${e.name}: ${e.message}`,
      });
    }
  }

  /**
     * @function deleteAMessage - deletes a user's specific message
     * @param {object} req - request object
     * @param {object} res - response object
     * @returns {object}
     *
  */
  static deleteAMessage(req, res) {
    const userInsession = helperUtils.getUserInSession(req);
    const { id } = userInsession;
    let dataIndex;
    const inboxmessage = inbox.find(i => i.messageId === parseInt(req.params.id, 10));
    const sentboxmessage = sent.find(s => s.messageId === parseInt(req.params.id, 10));
    if (inboxmessage) {
      const userReceiverId = inboxmessage.receiverId.find(rd => rd === id);
      const receiverIds = inboxmessage.receiverId;
      if (userReceiverId) {
        dataIndex = receiverIds.indexOf(userReceiverId);
        receiverIds.splice(dataIndex, 1);
        return res.status(200).json({
          status: res.statusCode,
          data: [{ message: 'message deleted' }],
        });
      }
    }
    if (sentboxmessage) {
      if (sentboxmessage.senderId === id) {
        dataIndex = sent.indexOf(sentboxmessage);
        sent.splice(dataIndex, 1);
        return res.status(200).json({
          status: res.statusCode,
          data: [{ message: 'message deleted' }],
        });
      }
    }
    return res.status(404).json({
      status: res.statusCode,
      error: 'no such message was found',
    });
  }
}

export default MessageController;
