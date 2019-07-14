"use strict";

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var connectionString = process.env.DEVDB;

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TESTDB;
}

if (process.env.NODE_ENV === 'production') {
  connectionString = process.env.PRODB;
}

var pool = new _pg.Pool({
  connectionString: connectionString
});
var query = "\nDROP TABLE IF EXISTS groupmembers;\nDROP TABLE IF EXISTS sent;\nDROP TABLE IF EXISTS inbox;\nDROP TABLE IF EXISTS contacts;\nDROP TABLE IF EXISTS messages;\nDROP TABLE IF EXISTS groups;\nDROP TABLE IF EXISTS users;\nCREATE TABLE IF NOT EXISTS\n  users(\n    id SERIAL PRIMARY KEY NOT NULL,\n    firstname VARCHAR(50) NOT NULL,\n    lastname VARCHAR(50) NOT NULL,\n    email VARCHAR(128) NOT NULL,\n    password VARCHAR(100) NOT NULL,\n    confirmPassword VARCHAR(100) NOT NULL\n  );\n  CREATE TABLE IF NOT EXISTS \n    messages(\n      id SERIAL PRIMARY KEY NOT NULL,\n      createdOn TIMESTAMP WITH TIME ZONE DEFAULT now(),\n      subject VARCHAR(100) NOT NULL,\n      message TEXT NOT NULL,\n      senderId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n      senderName VARCHAR(100) NOT NULL,\n      receiverName VARCHAR(100) NOT NULL,\n      parentMessageId INT DEFAULT NULL,\n      recipient TEXT NOT NULL,\n      receiverId INT REFERENCES users(id) ON DELETE CASCADE\n);\n\nCREATE TABLE IF NOT EXISTS\n  contacts(\n    id SERIAL PRIMARY KEY NOT NULL,\n    ownerId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n    userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n    firstname VARCHAR(50) NOT NULL,\n    lastname VARCHAR(50) NOT NULL,\n    email VARCHAR(128) NOT NULL\n  );\n\nCREATE TABLE IF NOT EXISTS \n    inbox(\n      id SERIAL PRIMARY KEY NOT NULL,\n      messageId INT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,\n      receiverId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n      senderId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n      createdOn TIMESTAMP WITH TIME ZONE DEFAULT now(),\n      status TEXT DEFAULT 'unread'\n  );\n\n  CREATE TABLE IF NOT EXISTS \n  sent(\n    id SERIAL PRIMARY KEY NOT NULL,\n    messageId INT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,\n    receiverId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n    senderId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n    createdOn TIMESTAMP WITH TIME ZONE DEFAULT now(),\n    status TEXT DEFAULT 'sent'\n  );\n\n  CREATE TABLE IF NOT EXISTS \n  groups(\n    id SERIAL PRIMARY KEY NOT NULL,\n    name VARCHAR(100) NOT NULL,\n    createdBy INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n    role VARCHAR(50) DEFAULT 'Admin'\n  );\n\n  CREATE TABLE IF NOT EXISTS \n    groupmembers(\n      id SERIAL PRIMARY KEY NOT NULL,\n      groupId INT NOT NULL REFERENCES groups(id) ON DELETE CASCADE,\n      userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n      role VARCHAR(50),\n      memberEmail TEXT NOT NULL\n  );\n";
pool.query(query) // eslint-disable-next-line no-unused-vars
.then(function (res) {
  console.log('table created');
  pool.end();
})["catch"](function (err) {
  console.log(err);
  pool.end();
});