"use strict";

/* eslint-disable operator-linebreak */
var dotenv = require('dotenv');

var _require = require('pg'),
    Pool = _require.Pool;

dotenv.config();
var connectionString;

if (process.env.NODE_ENV === 'development') {
  connectionString = process.env.DEVDB;
} else if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TESTDB;
} else {
  connectionString = process.env.PRODB;
}

var pool = new Pool({
  connectionString: connectionString
});

var dropUsers = function dropUsers() {
  var querytext = 'DROP TABLE IF EXISTS users CASCADE;';
  pool.query(querytext).then(function (res) {
    console.log(res);
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

var dropMessages = function dropMessages() {
  var querytext = 'DROP TABLE IF EXISTS messages CASCADE;';
  pool.query(querytext).then(function (res) {
    console.log(res);
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

var dropInbox = function dropInbox() {
  var querytext = 'DROP TABLE IF EXISTS inbox CASCADE;';
  pool.query(querytext).then(function (res) {
    console.log(res);
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

var dropSent = function dropSent() {
  var querytext = 'DROP TABLE IF EXISTS sent CASCADE;';
  pool.query(querytext).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

dropUsers();
dropMessages();
dropInbox();
dropSent();