'use strict';

/* eslint-disable operator-linebreak */
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

let connectionString;
if (process.env.NODE_ENV === 'development') {
  connectionString = process.env.DEVDB;
} else if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TESTDB;
} else {
  connectionString = process.env.PRODB;
}

const pool = new Pool({
  connectionString
});
const dropUsers = () => {
  const querytext = 'DROP TABLE IF EXISTS users CASCADE;';
  pool.query(querytext).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
    pool.end();
  });
};
const dropMessages = () => {
  const querytext = 'DROP TABLE IF EXISTS messages CASCADE;';
  pool.query(querytext).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
    pool.end();
  });
};
const dropInbox = () => {
  const querytext = 'DROP TABLE IF EXISTS inbox CASCADE;';
  pool.query(querytext).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
    pool.end();
  });
};

const dropSent = () => {
  const querytext = 'DROP TABLE IF EXISTS sent CASCADE;';
  pool.query(querytext).then(res => {
    console.log(res);
    pool.end();
  }).catch(err => {
    console.log(err);
    pool.end();
  });
};

dropUsers();
dropMessages();
dropInbox();
dropSent();