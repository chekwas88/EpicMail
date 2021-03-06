/* eslint-disable operator-linebreak */
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

let connectionString;
if (process.env.NODE_ENV === 'development') {
  connectionString = process.env.PRODB;
} else if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TESTDB;
}

const pool = new Pool({
  connectionString,
});

const createusersTable = () => {
  const querytext =
  `CREATE TABLE IF NOT EXISTS
    users(
      id SERIAL PRIMARY KEY NOT NULL,
      firstname VARCHAR(50) NOT NULL,
      lastname VARCHAR(50) NOT NULL,
      email VARCHAR(128) NOT NULL,
      password VARCHAR(100) NOT NULL,
      confirmpassword VARCHAR(100) NOT NULL
    );`;
  pool.query(querytext)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const messageTable = () => {
  const querytext =
  `CREATE TABLE IF NOT EXISTS 
  messages(
  id SERIAL PRIMARY KEY NOT NULL,
  createdOn TIMESTAMP WITH TIME ZONE DEFAULT now(),
  subject VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  senderId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  parentMessageId INT DEFAULT NULL,
  recipients TEXT NOT NULL,
  receiverId INT REFERENCES users(id) ON DELETE CASCADE
);`;
  pool.query(querytext)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const inboxTable = () => {
  const querytext =
  `CREATE TABLE IF NOT EXISTS 
    inbox(
      id SERIAL PRIMARY KEY NOT NULL,
      messageId INT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
      receiverId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      senderId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      createdOn TIMESTAMP WITH TIME ZONE DEFAULT now(),
      status TEXT DEFAULT 'unread'
  );`;
  pool.query(querytext)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const sentTable = () => {
  const querytext =
  `CREATE TABLE IF NOT EXISTS 
  sent(
    id SERIAL PRIMARY KEY NOT NULL,
    messageId INT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
    receiverId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    senderId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    createdOn TIMESTAMP WITH TIME ZONE DEFAULT now(),
    status TEXT DEFAULT 'sent'
  );`;
  pool.query(querytext)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const grouptable = () => {
  const querytext =
  `CREATE TABLE IF NOT EXISTS 
  groups(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    createdby INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'Admin'
  );`;
  pool.query(querytext)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
const groupmember = () => {
  const querytext =
    `CREATE TABLE IF NOT EXISTS 
    groupmembers(
      id SERIAL PRIMARY KEY NOT NULL,
      groupid INT NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
      userid INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      role VARCHAR(50) NOT NULL,
      memberemail TEXT NOT NULL
    );`;
  pool.query(querytext)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

createusersTable();
messageTable();
inboxTable();
sentTable();
grouptable();
groupmember();
