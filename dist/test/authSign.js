'use strict';

var _mocha = require('mocha');

var _chai = require('chai');

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _chai.use)(_chaiHttp2.default);

(0, _mocha.describe)('Post api/v1/auth/login', () => {
  (0, _mocha.it)('it log\'s in a user', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/auth/login').send({
      email: 'ted@epicmail.com',
      password: '123456'
    }).end((err, res) => {
      _chai.assert.equal(res.body.data[0].message, 'login was successful');
      _chai.assert.equal(res.status, 201);
      _chai.assert.isArray(res.body.data);
      done(err);
    });
  });

  (0, _mocha.it)('it should return BadRequestError if email  is empty', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/auth/login').send({
      email: '',
      password: '123456'
    }).end((err, res) => {
      _chai.assert.equal(res.body.errors.email, 'Email should be provided and should be a valid email type');
      _chai.assert.equal(res.status, 400);
      done(err);
    });
  });

  (0, _mocha.it)('it should return BadRequestError if password  is empty', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/auth/login').send({
      email: 'ted@epicmail.com',
      password: ''
    }).end((err, res) => {
      _chai.assert.equal(res.body.errors.password, 'Password should be provided and should have minimum of 6 characters');
      _chai.assert.equal(res.status, 400);
      done(err);
    });
  });

  (0, _mocha.it)('it should return BadRequestError if email is not provided', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/auth/login').send({
      password: '123456'
    }).end((err, res) => {
      _chai.assert.equal(res.body.errors.email, 'Email should be provided and should be a valid email type');
      _chai.assert.equal(res.status, 400);
      done(err);
    });
  });

  (0, _mocha.it)('it should return BadRequestError if password is not provided', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/auth/login').send({
      email: 'ted@epicmail.com'
    }).end((err, res) => {
      _chai.assert.equal(res.body.errors.password, 'Password should be provided and should have minimum of 6 characters');
      _chai.assert.equal(res.status, 400);
      done(err);
    });
  });

  (0, _mocha.it)('it should return BadRequestError if user email is invalid', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/auth/login').send({
      email: 'prince@mail.com',
      password: '123456'
    }).end((err, res) => {
      _chai.assert.equal(res.body.error, 'invalid email or password');
      _chai.assert.equal(res.status, 400);
      done(err);
    });
  });

  (0, _mocha.it)('it should return BadRequestError if user password is invalid', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/auth/login').send({
      email: 'ted@epicmail.com',
      password: 'password'
    }).end((err, res) => {
      _chai.assert.equal(res.body.error, 'invalid email or password');
      _chai.assert.equal(res.status, 400);
      done(err);
    });
  });
});