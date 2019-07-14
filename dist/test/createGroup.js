"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _chai.use)(_chaiHttp["default"]);
var token;
(0, _mocha.describe)('Post api/v1/groups', function () {
  (0, _mocha.before)(function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/auth/login').send({
      email: 'te123@epicmail.com',
      password: '123456'
    }).end(function (err, res) {
      // eslint-disable-next-line prefer-destructuring
      token = res.body.data[0].token;
      done(err);
    });
  });
  (0, _mocha.it)('it should return an error if token cannot be verifed', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/groups').set('authorization', 'Bearer jxxxxxxxxxxxxnns66s').send({
      name: 'cycle1'
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 401);

      _chai.assert.equal(res.body.error, 'token not verified');

      done(err);
    });
  });
  (0, _mocha.it)('it should return an error if token is not provided', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/groups').send({
      name: 'cycle1'
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 403);

      _chai.assert.equal(res.body.error, 'No authorization is provided');

      done(err);
    });
  });
  (0, _mocha.it)('it creates a group', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/groups').set('authorization', "Bearer ".concat(token)).send({
      name: 'cycle1'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.data[0].message, 'Group created');

      _chai.assert.equal(res.status, 201);

      done(err);
    });
  });
  (0, _mocha.it)('it should return BadRequestError if name is empty', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/groups').set('authorization', "Bearer ".concat(token)).send({
      name: ''
    }).end(function (err, res) {
      _chai.assert.equal(res.body.errors.name, 'Group name should be provided');

      _chai.assert.equal(res.status, 400);

      done(err);
    });
  });
  (0, _mocha.it)('it should return BadRequestError if subject is not provided', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/groups').set('authorization', "Bearer ".concat(token)).send({}).end(function (err, res) {
      _chai.assert.equal(res.body.errors.name, 'Group name should be provided');

      _chai.assert.equal(res.status, 400);

      done(err);
    });
  });
});