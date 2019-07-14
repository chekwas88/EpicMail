"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _pg = require("pg");

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
var _default = pool;
exports["default"] = _default;