'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _pg = require('pg');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

let connectionString = process.env.DEVDB;

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TESTDB;
}
if (process.env.NODE_ENV === 'production') {
  connectionString = process.env.PRODB;
}
const pool = new _pg.Pool({
  connectionString
});

exports.default = pool;