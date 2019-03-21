import HelperUtils from '../utils/messageHelper';
import pool from '../db/dbConnection';
import queries from '../utils/queries';

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
      recipients: req.body.recipients,
    };
    const receiver = await HelperUtils.getUser(mD.recipients);
    const receiverid = receiver.id;
    const { rows } = await pool.query(
      queries.sendMessageQuery, [mD.subject, mD.message, id, mD.recipients, receiverid],
    );
    const data = rows[0];
    const rId = data.receiverid;
    const messageid = data.id;
    await HelperUtils.createSentBox(messageid, rId, id);
    await HelperUtils.createInBox(messageid, rId, id);
    return res.status(201).json({
      status: res.statusCode,
      data: [
        {
          message: 'Message sent',
          data,
        },
      ],
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
    const data = await HelperUtils.getAllUserReceivedMessages(id);
    if (data === 'Your inbox is empty') {
      return res.status(200).json({
        message: data,
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
  static async getUnreadMessages(req, res) {
    const { id } = req.user;
    const data = await HelperUtils.getAllUserUnreadMessages(id);
    if (data === 'Your inbox is empty') {
      return res.status(200).json({
        message: data,
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
  static async getSentMessages(req, res) {
    const { id } = req.user;
    const data = await HelperUtils.getAllUserSentMessages(id);
    if (data === 'No sent messages') {
      return res.status(200).json({
        message: data,
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
  static async getAMessage(req, res) {
    const { id } = req.user;
    const messageId = parseInt(req.params.id, 10);
    const inboxMsg = await HelperUtils.getAninbox(messageId, id);
    const sentMsg = await HelperUtils.getASentbox(messageId, id, status[2]);
    if (inboxMsg !== undefined) {
      if (inboxMsg.status !== status[3]) {
        const { messageid } = inboxMsg;
        const { rows } = await pool.query(
          queries.getAnInboxMessageQuery, [messageid, id],
        );
        const data = rows[0];
        if (data !== undefined) {
          await HelperUtils.updateStatus(status[1], data.id, id);
          return res.status(200).json({
            status: res.statusCode,
            data: [
              {
                message: 'message retrieved',
                data,
              },
            ],
          });
        }
      }
    }
    if (sentMsg !== undefined) {
      const { rows } = await pool.query(
        queries.getASentboxMessageQuery, [sentMsg.messageid, id],
      );
      const data = rows[0];
      if (data !== undefined) {
        return res.status(200).json({
          status: res.statusCode,
          data: [
            {
              message: 'message retrieved',
              data,
            },
          ],
        });
      }
    }
    return res.status(404).json({
      status: res.statusCode,
      error: 'no such message was found',
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
    const inboxMsg = await HelperUtils.getAninbox(messageId, id);
    const sentMsg = await HelperUtils.getASentbox(messageId, id, status[2]);
    if (inboxMsg !== undefined) {
      if (inboxMsg.status !== status[3]) {
        await pool.query(queries.DeleteInbox, [status[3], messageId, id]);
        return res.status(200).json({
          status: res.statusCode,
          data: [{ message: 'message deleted' }],
        });
      }
    }
    if (sentMsg !== undefined) {
      await pool.query(queries.DeleteSentbox, [status[3], messageId, id]);
      return res.status(200).json({
        status: res.statusCode,
        data: [{ message: 'message deleted' }],
      });
    }
    return res.status(404).json({
      status: res.statusCode,
      error: 'no such message was found',
    });
  }
}

export default MessageController;
