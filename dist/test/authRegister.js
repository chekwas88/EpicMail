"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _chai.use)(_chaiHttp["default"]);
(0, _mocha.describe)('Post api/v1/auth/signup', function () {
  (0, _mocha.it)('it register\'s a user', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/auth/signup').send({
      firstName: 'Ted',
      lastName: 'Mosby',
      email: 'ted123@epicmail.com',
      password: '123456',
      confirmPassword: '123456'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.data[0].message, 'Account created successfully');

      _chai.assert.equal(res.status, 201);

      _chai.assert.isArray(res.body.data);

      done(err);
    });
  });
  (0, _mocha.it)('it register\'s a user', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/auth/signup').send({
      firstName: 'Marshall',
      lastName: 'Ericson',
      email: 'te123@epicmail.com',
      password: '123456',
      confirmPassword: '123456'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.data[0].message, 'Account created successfully');

      _chai.assert.equal(res.status, 201);

      _chai.assert.isArray(res.body.data);

      done(err);
    });
  });
  (0, _mocha.it)('it register\'s a user', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/auth/signup').send({
      firstName: 'Lily',
      lastName: 'Aldrin',
      email: 'lily@epicmail.com',
      password: '123456',
      confirmPassword: '123456'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.data[0].message, 'Account created successfully');

      _chai.assert.equal(res.status, 201);

      _chai.assert.isArray(res.body.data);

      done(err);
    });
  });
  (0, _mocha.it)('it should return BadRequestError if firstname  is empty', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/auth/signup').send({
      firstName: '',
      lastName: 'Mosby',
      email: 'ted@epicmail.com',
      password: '123456',
      confirmPassword: '123456'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.errors.firstName, 'Firstname should be provided and should have minimum of 2 characters and maximum of 50 chracters and is required');

      _chai.assert.equal(res.status, 400);

      done(err);
    });
  });
  (0, _mocha.it)('it should return BadRequestError if lastname  is empty', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/auth/signup').send({
      firstName: 'ted',
      lastName: '',
      email: 'ted@epicmail.com',
      password: '123456',
      confirmPassword: '123456'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.errors.lastName, 'Lastname should be provided and should have minimum of 2 and maximum of 50 characters and is required');

      _chai.assert.equal(res.status, 400);

      done(err);
    });
  });
  (0, _mocha.it)('it should return BadRequestError if password is empty', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/auth/signup').send({
      firstName: 'ted',
      lastName: 'mosby',
      email: 'ted@epicmail.com',
      password: '',
      confirmPassword: '123456'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.errors.password, 'Password should be provided and should have minimum of 6 characters');

      _chai.assert.equal(res.status, 400);

      done(err);
    });
  });
  (0, _mocha.it)('it should return BadRequestError if confirmpassword is empty', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/auth/signup').send({
      firstName: 'ted',
      lastName: 'mosby',
      email: 'ted@epicmail.com',
      password: '123456',
      confirmPassword: ''
    }).end(function (err, res) {
      _chai.assert.equal(res.body.errors.confirmPassword, 'confirmPassword should be provided and should have minimum of 6 characters');

      _chai.assert.equal(res.status, 400);

      done(err);
    });
  });
  (0, _mocha.it)('it should return BadRequestError if  firstname is not provided', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/auth/signup').send({
      lastName: 'mosby',
      email: 'ted@epicmail.com',
      password: '123456',
      confirmPassword: '123456'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.errors.firstName, 'Firstname should be provided and should have minimum of 2 characters and maximum of 50 chracters and is required');

      _chai.assert.equal(res.status, 400);

      done(err);
    });
  });
  (0, _mocha.it)('it should return BadRequestError if  lastname is not provided', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/auth/signup').send({
      firstName: 'ted',
      email: 'ted@epicmail.com',
      password: '123456',
      confirmPassword: '123456'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.errors.lastName, 'Lastname should be provided and should have minimum of 2 and maximum of 50 characters and is required');

      _chai.assert.equal(res.status, 400);

      done(err);
    });
  });
  (0, _mocha.it)('it should return BadRequestError if  password is not provided', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/auth/signup').send({
      firstName: 'ted',
      lastName: 'mosby',
      email: 'ted@epicmail.com',
      confirmPassword: '123456'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.errors.password, 'Password should be provided and should have minimum of 6 characters');

      _chai.assert.equal(res.status, 400);

      done(err);
    });
  });
  (0, _mocha.it)('it should return BadRequestError if  confrimpassword is not provided', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/auth/signup').send({
      firstName: 'ted',
      lastName: 'mosby',
      email: 'ted@epicmail.com',
      password: '123456'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.errors.confirmPassword, 'confirmPassword should be provided and should have minimum of 6 characters');

      _chai.assert.equal(res.status, 400);

      done(err);
    });
  });
  (0, _mocha.it)('it should return BadRequestError if  email has been registered before', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/auth/signup').send({
      firstName: 'ted',
      lastName: 'mosby',
      email: 'ted123@epicmail.com',
      password: '123456',
      confirmPassword: '123456'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.error, 'email has been registered before');

      _chai.assert.equal(res.status, 400);

      done(err);
    });
  });
  (0, _mocha.it)('it should return BadRequestError if  password is not equal to confirmpassword', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/auth/signup').send({
      firstName: 'ted',
      lastName: 'mosby',
      email: 'tedkn@epicmail.com',
      password: '123456',
      confirmPassword: '12345678'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.error, 'password and confirmpassword should be same');

      _chai.assert.equal(res.status, 400);

      done(err);
    });
  });
});