"use strict";

/* eslint-disable operator-linebreak */
var dotenv = require('dotenv');

var _require = require('pg'),
    Pool = _require.Pool;

dotenv.config();
var connectionString;

if (process.env.NODE_ENV === 'development') {
  connectionString = process.env.PRODB;
} else if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TESTDB;
}

var pool = new Pool({
  connectionString: connectionString
});

var createusersTable = function createusersTable() {
  var querytext = "CREATE TABLE IF NOT EXISTS\n    users(\n      id SERIAL PRIMARY KEY NOT NULL,\n      firstname VARCHAR(50) NOT NULL,\n      lastname VARCHAR(50) NOT NULL,\n      email VARCHAR(128) NOT NULL,\n      password VARCHAR(100) NOT NULL,\n      confirmpassword VARCHAR(100) NOT NULL\n    );";
  pool.query(querytext).then(function (res) {
    console.log(res);
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

var messageTable = function messageTable() {
  var querytext = "CREATE TABLE IF NOT EXISTS \n  messages(\n  id SERIAL PRIMARY KEY NOT NULL,\n  createdOn TIMESTAMP WITH TIME ZONE DEFAULT now(),\n  subject VARCHAR(100) NOT NULL,\n  message TEXT NOT NULL,\n  senderId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n  parentMessageId INT DEFAULT NULL,\n  recipients TEXT NOT NULL,\n  receiverId INT REFERENCES users(id) ON DELETE CASCADE\n);";
  pool.query(querytext).then(function (res) {
    console.log(res);
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

var inboxTable = function inboxTable() {
  var querytext = "CREATE TABLE IF NOT EXISTS \n    inbox(\n      id SERIAL PRIMARY KEY NOT NULL,\n      messageId INT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,\n      receiverId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n      senderId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n      createdOn TIMESTAMP WITH TIME ZONE DEFAULT now(),\n      status TEXT DEFAULT 'unread'\n  );";
  pool.query(querytext).then(function (res) {
    console.log(res);
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

var sentTable = function sentTable() {
  var querytext = "CREATE TABLE IF NOT EXISTS \n  sent(\n    id SERIAL PRIMARY KEY NOT NULL,\n    messageId INT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,\n    receiverId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n    senderId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n    createdOn TIMESTAMP WITH TIME ZONE DEFAULT now(),\n    status TEXT DEFAULT 'sent'\n  );";
  pool.query(querytext).then(function (res) {
    console.log(res);
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

var grouptable = function grouptable() {
  var querytext = "CREATE TABLE IF NOT EXISTS \n  groups(\n    id SERIAL PRIMARY KEY NOT NULL,\n    name VARCHAR(100) NOT NULL,\n    createdby INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n    role VARCHAR(50) DEFAULT 'Admin'\n  );";
  pool.query(querytext).then(function (res) {
    console.log(res);
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

var groupmember = function groupmember() {
  var querytext = "CREATE TABLE IF NOT EXISTS \n    groupmembers(\n      id SERIAL PRIMARY KEY NOT NULL,\n      groupid INT NOT NULL REFERENCES groups(id) ON DELETE CASCADE,\n      userid INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n      role VARCHAR(50) NOT NULL,\n      memberemail TEXT NOT NULL\n    );";
  pool.query(querytext).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
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