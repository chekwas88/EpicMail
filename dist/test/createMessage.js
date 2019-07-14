"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _chai.use)(_chaiHttp["default"]);
var token;
(0, _mocha.describe)('Post api/v1/messages', function () {
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
    (0, _chai.request)(_app["default"]).post('/api/v1/messages').set('authorization', 'Bearer jxxxxxxxxxxxxnns66s').send({
      subject: 'Meeting',
      message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
      recipient: 'ted123@epicmail.com'
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 401);

      _chai.assert.equal(res.body.error, 'token not verified');

      done(err);
    });
  });
  (0, _mocha.it)('it should return an error if token is not provided', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/messages').send({
      subject: 'Meeting',
      message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
      recipient: 'ted123@epicmail.com'
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 403);

      _chai.assert.equal(res.body.error, 'No authorization is provided');

      done(err);
    });
  });
  (0, _mocha.it)('it sends/create message', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/messages').set('authorization', "Bearer ".concat(token)).send({
      subject: 'Meeting',
      message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
      recipient: 'ted123@epicmail.com'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.data[0].message, 'Message sent');

      _chai.assert.equal(res.status, 201);

      done(err);
    });
  });
  (0, _mocha.it)('it sends/create message', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/messages').set('authorization', "Bearer ".concat(token)).send({
      subject: 'Meeting',
      message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
      recipient: 'ted123@epicmail.com'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.data[0].message, 'Message sent');

      _chai.assert.equal(res.status, 201);

      done(err);
    });
  });
  (0, _mocha.it)('it should return BadRequestError if subject  is empty', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/messages').set('authorization', "Bearer ".concat(token)).send({
      subject: '',
      message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
      recipient: 'ted@epicmail.com'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.errors.subject, 'subject should be provided and must be minimum of 2 to maximum 50 characters');

      _chai.assert.equal(res.status, 400);

      done(err);
    });
  });
  (0, _mocha.it)('it should return BadRequestError if message  is empty', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/messages').set('authorization', "Bearer ".concat(token)).send({
      subject: 'meeting',
      message: '',
      recipients: 'ted@epicmail.com'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.errors.message, 'message should be provided');

      _chai.assert.equal(res.status, 400);

      done(err);
    });
  });
  (0, _mocha.it)('it should return BadRequestError if recipients  is empty', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/messages').set('authorization', "Bearer ".concat(token)).send({
      subject: 'Meeting',
      message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
      recipient: ''
    }).end(function (err, res) {
      _chai.assert.equal(res.body.errors.recipient, 'recipients should be email(s) and should be provided');

      _chai.assert.equal(res.status, 400);

      done(err);
    });
  });
  (0, _mocha.it)('it should return BadRequestError if subject is not provided', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/messages').set('authorization', "Bearer ".concat(token)).send({
      message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
      recipient: 'ted@epicmail.com'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.errors.subject, 'subject should be provided and must be minimum of 2 to maximum 50 characters');

      _chai.assert.equal(res.status, 400);

      done(err);
    });
  });
  (0, _mocha.it)('it should return BadRequestError if message is not provided', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/messages').set('authorization', "Bearer ".concat(token)).send({
      subject: 'Meeting',
      recipient: 'ted@epicmail.com'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.errors.message, 'message should be provided');

      _chai.assert.equal(res.status, 400);

      done(err);
    });
  });
  (0, _mocha.it)('it should return BadRequestError if recipients is not provided', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/messages').set('authorization', "Bearer ".concat(token)).send({
      subject: 'meeting',
      message: 'This is to inform you that there will be a staff meeting today at 2pm prompt'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.errors.recipient, 'recipients should be email(s) and should be provided');

      _chai.assert.equal(res.status, 400);

      done(err);
    });
  });
  (0, _mocha.it)('it should return NotFoundError if no registered email is provided', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/messages').set('authorization', "Bearer ".concat(token)).send({
      subject: 'Meeting',
      message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
      recipient: 'lily@email.com'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.error, 'No registered email was found');

      _chai.assert.equal(res.status, 404);

      done(err);
    });
  });
});