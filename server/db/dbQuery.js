import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connectionString = process.env.DEVDB;

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TESTDB;
}
if (process.env.NODE_ENV === 'production') {
  connectionString = process.env.PRODB;
}
const pool = new Pool({
  connectionString,
});

const query = `
DROP TABLE IF EXISTS groupmembers;
DROP TABLE IF EXISTS sent;
DROP TABLE IF EXISTS inbox;
DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS
  users(
    id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(128) NOT NULL,
    password VARCHAR(100) NOT NULL,
    confirmPassword VARCHAR(100) NOT NULL
  );
  CREATE TABLE IF NOT EXISTS 
    messages(
      id SERIAL PRIMARY KEY NOT NULL,
      createdOn TIMESTAMP WITH TIME ZONE DEFAULT now(),
      subject VARCHAR(100) NOT NULL,
      message TEXT NOT NULL,
      senderId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      senderName VARCHAR(100) NOT NULL,
      receiverName VARCHAR(100) NOT NULL,
      parentMessageId INT DEFAULT NULL,
      recipient TEXT NOT NULL,
      receiverId INT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS
  contacts(
    id SERIAL PRIMARY KEY NOT NULL,
    ownerId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(128) NOT NULL
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

  CREATE TABLE IF NOT EXISTS 
  groups(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    createdBy INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'Admin'
  );

  CREATE TABLE IF NOT EXISTS 
    groupmembers(
      id SERIAL PRIMARY KEY NOT NULL,
      groupId INT NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
      userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      role VARCHAR(50),
      memberEmail TEXT NOT NULL
  );
`;


pool.query(query)
  // eslint-disable-next-line no-unused-vars
  .then((res) => {
    console.log('table created');
    pool.end();
  })
  .catch((err) => {
    console.log(err);
    pool.end();
  });
