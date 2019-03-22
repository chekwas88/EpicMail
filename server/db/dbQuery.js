import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.TESTDB;
const pool = new Pool({
  connectionString,
});

const query = `
DROP TABLE IF EXISTS groupmembers;
DROP TABLE IF EXISTS sent;
DROP TABLE IF EXISTS inbox;
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

  CREATE TABLE IF NOT EXISTS 
  groups(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    createdby INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'Admin'
  );

  CREATE TABLE IF NOT EXISTS 
    groupmembers(
      id SERIAL PRIMARY KEY NOT NULL,
      groupid INT NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
      userid INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      role VARCHAR(50),
      memberemail TEXT NOT NULL
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
