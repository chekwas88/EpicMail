'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  registerUserQuery: `INSERT INTO 
    users(firstname, lastname, email, password, confirmpassword) 
    VALUES ($1, $2, $3, $4, $5) RETURNING *`,

  loginQuery: 'SELECT * FROM users WHERE email=$1',
  allUserQ: 'SELECT * FROM users',
  allMessages: 'SELECT * FROM messages',
  getAllInbox: 'SELECT * FROM inbox WHERE receiverid=$1',
  getAllSentBox: 'SELECT * from sent WHERE status=$1 AND senderid=$2',
  getAnIbox: 'SELECT * from inbox WHERE messageid=$1 AND receiverid=$2',
  getASentbox: 'SELECT * from sent WHERE messageid=$1 AND senderid=$2 AND status=$3',
  getAllUnread: 'SELECT * FROM inbox WHERE status=$1 AND receiverid=$2',
  getUserInboxMessagesQ: 'SELECT * FROM messages WHERE receiverid=$1',
  getUserSentMessagesQ: 'SELECT * FROM messages WHERE senderid=$1',
  getAnInboxMessageQuery: 'SELECT * FROM messages WHERE id=$1 AND receiverid=$2',
  getASentboxMessageQuery: 'SELECT * FROM messages WHERE id=$1 AND senderid=$2',
  sendMessageQuery: `INSERT INTO messages(subject, message, senderid, recipients, receiverid) 
  VALUES ($1, $2, $3, $4, $5) RETURNING *`,
  addInbox: 'INSERT INTO inbox(messageid, receiverid, senderid) VALUES ($1, $2, $3)',
  addSent: 'INSERT INTO sent(messageid, receiverid, senderid) VALUES ($1, $2, $3)',
  updateStatusQ: 'UPDATE inbox SET status=$1 WHERE messageid=$2 AND receiverid=$3 RETURNING messageid, receiverid',
  DeleteInbox: 'UPDATE inbox SET status=$1 WHERE messageid=$2 AND receiverid=$3',
  DeleteSentbox: 'UPDATE sent SET status=$1 WHERE messageid=$2 AND senderid=$3'
};