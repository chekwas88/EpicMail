"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _chai.use)(_chaiHttp["default"]);
(0, _mocha.describe)('Post api/v1/auth/login', function () {
  (0, _mocha.it)('it log\'s in a user', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/auth/login').send({
      email: 'ted123@epicmail.com',
      password: '123456'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.data[0].message, 'login was successful');

      _chai.assert.equal(res.status, 200);

      _chai.assert.isArray(res.body.data);

      done(err);
    });
  });
  (0, _mocha.it)('it should return BadRequestError if email  is empty', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/auth/login').send({
      email: '',
      password: '123456'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.errors.email, 'Email should be provided and should be a valid email type');

      _chai.assert.equal(res.status, 400);

      done(err);
    });
  });
  (0, _mocha.it)('it should return BadRequestError if password  is empty', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/auth/login').send({
      email: 'ted@epicmail.com',
      password: ''
    }).end(function (err, res) {
      _chai.assert.equal(res.body.errors.password, 'Password should be provided and should have minimum of 6 characters');

      _chai.assert.equal(res.status, 400);

      done(err);
    });
  });
  (0, _mocha.it)('it should return BadRequestError if email is not provided', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/auth/login').send({
      password: '123456'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.errors.email, 'Email should be provided and should be a valid email type');

      _chai.assert.equal(res.status, 400);

      done(err);
    });
  });
  (0, _mocha.it)('it should return BadRequestError if password is not provided', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/auth/login').send({
      email: 'ted@epicmail.com'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.errors.password, 'Password should be provided and should have minimum of 6 characters');

      _chai.assert.equal(res.status, 400);

      done(err);
    });
  });
  (0, _mocha.it)('it should return BadRequestError if user email is invalid', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/auth/login').send({
      email: 'prince@mail.com',
      password: '123456'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.error, 'invalid email or password');

      _chai.assert.equal(res.status, 400);

      done(err);
    });
  });
  (0, _mocha.it)('it should return BadRequestError if user password is invalid', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/auth/login').send({
      email: 'ted123@epicmail.com',
      password: 'password'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.error, 'invalid email or password');

      _chai.assert.equal(res.status, 400);

      done(err);
    });
  });
});