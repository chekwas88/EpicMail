/* eslint-disable operator-linebreak */
const usersTable =
  `CREATE TABLE IF NOT EXISTS
    users(
      id SERIAL PRIMARY KEY NOT NULL,
      firstname VARCHAR(50) NOT NULL,
      lastname VARCHAR(50) NOT NULL,
      email VARCHAR(128) NOT NULL,
      password VARCHAR(100) NOT NULL,
      confirmpassword VARCHAR(100) NOT NULL
    );`;

const messageTable =
  `CREATE TABLE IF NOT EXISTS 
    messages(
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP WITH TIME ZONE DEFAULT now(),
    subject VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'draft',
    senderId INT NOT NULL,
    parentMessageId INT DEFAULT NULL,
    recipients TEXT[] NOT NULL
  );`;

const inboxTable =
  `CREATE TABLE IF NOT EXISTS 
    inbox(
    receiverId INT REFERENCES messages(receiverId) ON DELETE CASCADE,
    messageId INT REFERENCES messages(id) ON DELETE CASCADE,
    createdOn TIMESTAMP WITH TIME ZONE DEFAULT now()
  );`;

const sentTable =
`CREATE TABLE IF NOT EXISTS 
  inbox(
  senderId INT REFERENCES users(id) ON DELETE CASCADE,
  messageId INT REFERENCES messages(id) ON DELETE CASCADE,
  createdOn TIMESTAMP WITH TIME ZONE DEFAULT now()
);`;

const createTableQueries = `${usersTable} ${messageTable} ${inboxTable} ${sentTable}`;
export default createTableQueries;
