'use strict';

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

const connectionString = process.env.TESTDB;
const pool = new _pg.Pool({
  connectionString
});

const query = `
DROP TABLE IF EXISTS sent;
DROP TABLE IF EXISTS inbox;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS
  users(
    id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(128) NOT NULL,
    password VARCHAR(100) NOT NULL,
    confirmpassword VARCHAR(100) NOT NULL
  );
  CREATE TABLE IF NOT EXISTS 
    messages(
      id SERIAL PRIMARY KEY NOT NULL,
      createdOn TIMESTAMP WITH TIME ZONE DEFAULT now(),
      subject VARCHAR(100) NOT NULL,
      message TEXT NOT NULL,
      senderId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      parentMessageId INT DEFAULT NULL,
      recipients TEXT NOT NULL,
      receiverId INT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS 
    inbox(
      id SERIAL PRIMARY KEY NOT NULL,
      messageId INT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
      receiverId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      senderId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      createdOn TIMESTAMP WITH TIME ZONE DEFAULT now(),
      status TEXT DEFAULT 'unread'
  );

  CREATE TABLE IF NOT EXISTS 
  sent(
    id SERIAL PRIMARY KEY NOT NULL,
    messageId INT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
    receiverId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    senderId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    createdOn TIMESTAMP WITH TIME ZONE DEFAULT now(),
    status TEXT DEFAULT 'sent'
  );
`;

pool.query(query)
// eslint-disable-next-line no-unused-vars
.then(res => {
  console.log('table created');
  pool.end();
}).catch(err => {
  console.log(err);
  pool.end();
});