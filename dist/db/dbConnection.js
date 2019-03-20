'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

let connectionString;
if (process.env.NODE_ENV === 'development') {
  connectionString = process.env.DEVDB;
} else if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.DEVDB;
} else {
  connectionString = process.env.PRODB;
}
const pool = new _pg.Pool({
  connectionString
});

exports.default = pool;