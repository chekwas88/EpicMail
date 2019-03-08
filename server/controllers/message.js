import helperUtils from '../utils/helper';
import error from '../utils/error';
import messages from '../model/message';
import inbox from '../model/inbox';
import sent from '../model/sent';
import users from '../model/users';

const { NotFoundError } = error;

class MessageController {
  static sendMessage(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    const userInsession = users.find(u => u.token === token);
    const senderId = userInsession.id;
    const id = messages.length + 1;
    const messageDetails = {
      id,
      createdOn: req.body.createdOn,
      subject: req.body.subject,
      message: req.body.message,
      status: req.body.status,
      senderId,
      recipients: req.body.recipients,
    };
    const Authrecipients = helperUtils.validateRecipients(messageDetails.recipients);
    try {
      if (Authrecipients.length <= 0) {
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
        message: 'Message sent',
      });
    } catch (e) {
      return res.status(404).json({
        status: res.statusCode,
        error: `${e.name}: ${e.message}`,
      });
    }
  }

  static getReceivedMessages(req, res) {
    const userInsession = helperUtils.getUserInSession(req);
    const { id } = userInsession;
    const data = helperUtils.getAllReceivedMessages(id);
    if (data.length <= 0) {
      return res.status(200).json({
        status: res.statusCode,
        message: 'Your inbox is empty',
      });
    }
    return res.status(200).json({
      status: res.statusCode,
      message: 'inbox messages retrieved',
      data,
    });
  }

  static getUnreadMessages(req, res) {
    const userInsession = helperUtils.getUserInSession(req);
    const { id } = userInsession;
    const allmsgs = helperUtils.getAllReceivedMessages(id);
    const data = allmsgs.filter(am => am.status === 'unread');
    if (data.length <= 0) {
      return res.status(200).json({
        status: res.statusCode,
        message: 'No unread message',
      });
    }
    return res.status(200).json({
      status: res.statusCode,
      message: 'unread messages retrieved',
      data,
    });
  }

  static getAMessage(req, res) {
    const userInsession = helperUtils.getUserInSession(req);
    const { id } = userInsession;
    const msg = helperUtils.getAllMessages(id);
    const data = msg.find(d => d.id === parseInt(req.params.id, 10));
    try {
      if (!data) {
        throw new NotFoundError('no such message was found');
      }
      return res.status(200).json({
        status: res.statusCode,
        message: 'message retrieved',
        data,
      });
    } catch (e) {
      return res.status(404).json({
        status: res.statusCode,
        error: `${e.name}: ${e.message}`,
      });
    }
  }
}

export default MessageController;
