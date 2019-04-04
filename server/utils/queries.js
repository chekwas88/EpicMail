export default {
  registerUserQuery: `INSERT INTO 
    users(firstname, lastname, email, password, confirmpassword) 
    VALUES ($1, $2, $3, $4, $5) RETURNING *`,

  loginQuery: 'SELECT * FROM users WHERE email=$1',
  messenger: 'SELECT * FROM users WHERE id=$1',
  allUserQ: 'SELECT * FROM users',
  getAuser: 'SELECT * FROM users WHERE id=$1',
  allMessages: 'SELECT * FROM messages',
  getAllInbox: 'SELECT * FROM inbox WHERE receiverid=$1',
  getAllSentBox: 'SELECT * from sent WHERE status=$1 AND senderid=$2',
  getAnIbox: 'SELECT * from inbox WHERE messageid=$1 AND receiverid=$2',
  getASentbox: 'SELECT * from sent WHERE messageid=$1 AND senderid=$2 AND status=$3',
  getUserInboxMessagesQ: 'SELECT * FROM messages WHERE receiverid=$1',
  getAnInboxMessageQuery: 'SELECT * FROM messages WHERE id=$1 AND receiverid=$2',
  getASentboxMessageQuery: 'SELECT * FROM messages WHERE id=$1 AND senderid=$2',
  sendMessageQuery: `INSERT INTO messages(subject, message, senderId, recipient, receiverId, senderName, receiverName) 
  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
  addInbox: 'INSERT INTO inbox(messageid, receiverid, senderid) VALUES ($1, $2, $3)',
  addContact: 'INSERT INTO contacts(userId, firstname, lastname, email) VALUES ($1, $2, $3, $4)',
  addSent: 'INSERT INTO sent(messageId, receiverId, senderId) VALUES ($1, $2, $3)',
  updateStatusQ: 'UPDATE inbox SET status=$1 WHERE messageId=$2 AND receiverId=$3 RETURNING messageid, receiverid',
  DeleteInbox: 'UPDATE inbox SET status=$1 WHERE messageId=$2 AND receiverId=$3',
  DeleteSentbox: 'UPDATE sent SET status=$1 WHERE messageId=$2 AND senderId=$3',
  createGroup: `INSERT INTO groups(name, createdby) 
  VALUES ($1, $2) RETURNING *`,
  addmember: 'INSERT INTO groupmembers(groupId, userId, memberemail, role) VALUES ($1, $2, $3, $4) RETURNING groupid, userid, role',
  getgroup: 'SELECT * FROM groups WHERE id=$1',
  deleteGroup: 'DELETE FROM groups WHERE id=$1',
  deleteMember: 'DELETE FROM groupmembers WHERE groupId=$1 AND userId=$2',
  getGroupmember: 'SELECT * FROM groupmembers WHERE groupId=$1 AND userId=$2',
  updateGroup: 'UPDATE groups SET name=$1 WHERE id=$2 RETURNING*',

  sendToGroup: `INSERT INTO messages(subject, message, senderId, recipients, receiverId) 
  VALUES ($1, $2, $3, $4, $5) RETURNING *`,
  getAllGroupMembers: 'SELECT * FROM groupmembers WHERE groupId=$1',
  getAllGroups: 'SELECT * FROM groupmembers WHERE userId=$1',
};
