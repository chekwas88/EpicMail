'use strict';

var _mocha = require('mocha');

var _chai = require('chai');

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _chai.use)(_chaiHttp2.default);

(0, _mocha.describe)('Post api/v1/auth/signup', () => {
  (0, _mocha.it)('it should return BadRequestError if firstname  is empty', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/auth/signup').send({
      firstName: '',
      lastName: 'Mosby',
      email: 'ted@epicmail.com',
      password: 'password',
      confirmPassword: 'password'
    }).end((err, res) => {
      _chai.assert.equal(res.body.errors.firstName, 'Firstname should be provided and should have minimum of 2 characters and maximum of 50 chracters and is required');
      _chai.assert.equal(res.status, 400);
      done(err);
    });
  });
  (0, _mocha.it)('it should return BadRequestError if lastname  is empty', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/auth/signup').send({
      firstName: 'ted',
      lastName: '',
      email: 'ted@epicmail.com',
      password: 'password',
      confirmPassword: 'password'
    }).end((err, res) => {
      _chai.assert.equal(res.body.errors.lastName, 'Lastname should be provided and should have minimum of 2 and maximum of 50 characters and is required');
      _chai.assert.equal(res.status, 400);
      done(err);
    });
  });

  (0, _mocha.it)('it should return BadRequestError if password is empty', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/auth/signup').send({
      firstName: 'ted',
      lastName: 'mosby',
      email: 'ted@epicmail.com',
      password: '',
      confirmPassword: 'password'
    }).end((err, res) => {
      _chai.assert.equal(res.body.errors.password, 'Password should be provided and should have minimum of 6 characters');
      _chai.assert.equal(res.status, 400);
      done(err);
    });
  });

  (0, _mocha.it)('it should return BadRequestError if confirmpassword is empty', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/auth/signup').send({
      firstName: 'ted',
      lastName: 'mosby',
      email: 'ted@epicmail.com',
      password: 'password',
      confirmPassword: ''
    }).end((err, res) => {
      _chai.assert.equal(res.body.errors.confirmPassword, 'confirmPassword should be provided and should have minimum of 6 characters');
      _chai.assert.equal(res.status, 400);
      done(err);
    });
  });

  (0, _mocha.it)('it should return BadRequestError if  firstname is not provided', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/auth/signup').send({
      lastName: 'mosby',
      email: 'ted@epicmail.com',
      password: 'password',
      confirmPassword: 'password'
    }).end((err, res) => {
      _chai.assert.equal(res.body.errors.firstName, 'Firstname should be provided and should have minimum of 2 characters and maximum of 50 chracters and is required');
      _chai.assert.equal(res.status, 400);
      done(err);
    });
  });

  (0, _mocha.it)('it should return BadRequestError if  lastname is not provided', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/auth/signup').send({
      firstName: 'ted',
      email: 'ted@epicmail.com',
      password: 'password',
      confirmPassword: 'password'
    }).end((err, res) => {
      _chai.assert.equal(res.body.errors.lastName, 'Lastname should be provided and should have minimum of 2 and maximum of 50 characters and is required');
      _chai.assert.equal(res.status, 400);
      done(err);
    });
  });
  (0, _mocha.it)('it should return BadRequestError if  password is not provided', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/auth/signup').send({
      firstName: 'ted',
      lastName: 'mosby',
      email: 'ted@epicmail.com',
      confirmPassword: 'password'
    }).end((err, res) => {
      _chai.assert.equal(res.body.errors.password, 'Password should be provided and should have minimum of 6 characters');
      _chai.assert.equal(res.status, 400);
      done(err);
    });
  });

  (0, _mocha.it)('it should return BadRequestError if  confrimpassword is not provided', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/auth/signup').send({
      firstName: 'ted',
      lastName: 'mosby',
      email: 'ted@epicmail.com',
      password: 'password'
    }).end((err, res) => {
      _chai.assert.equal(res.body.errors.confirmPassword, 'confirmPassword should be provided and should have minimum of 6 characters');
      _chai.assert.equal(res.status, 400);
      done(err);
    });
  });

  (0, _mocha.it)('it should return BadRequestError if  email has been registered before', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/auth/signup').send({
      firstName: 'ted',
      lastName: 'mosby',
      email: 'corvinus@epicmail.com',
      password: 'password',
      confirmPassword: 'password'
    }).end((err, res) => {
      _chai.assert.equal(res.body.error, 'email has been registered before');
      _chai.assert.equal(res.status, 400);
      done(err);
    });
  });

  (0, _mocha.it)('it should return BadRequestError if  password is not equal to confirmpassword', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/auth/signup').send({
      firstName: 'ted',
      lastName: 'mosby',
      password: 'passwords',
      confirmPassword: 'password',
      email: 'teddy@epicmail.com'
    }).end((err, res) => {
      _chai.assert.equal(res.body.error, 'password and confirmpassword should be same');
      _chai.assert.equal(res.status, 400);
      done(err);
    });
  });
  (0, _mocha.it)('it register\'s a user', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/auth/signup').send({
      firstName: 'Ted',
      lastName: 'Mosby',
      email: 'ted@epicmail.com',
      password: 'password',
      confirmPassword: 'password'
    }).end((err, res) => {
      _chai.assert.equal(res.body.data[0].message, 'Account created successfully');
      _chai.assert.equal(res.status, 201);
      _chai.assert.isArray(res.body.data);
      done(err);
    });
  });
});