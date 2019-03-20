'use strict';

var _mocha = require('mocha');

var _chai = require('chai');

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _chai.use)(_chaiHttp2.default);

let token;

(0, _mocha.describe)('Post api/v1/messages', () => {
  (0, _mocha.before)(done => {
    (0, _chai.request)(_app2.default).post('/api/v1/auth/login').send({ email: 'ted@epicmail.com', password: '123456' }).end((err, res) => {
      // eslint-disable-next-line prefer-destructuring
      token = res.body.data[0].token;
      done(err);
    });
  });

  (0, _mocha.it)('it should return an error if token cannot be verifed', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/messages').set('authorization', 'Bearer jxxxxxxxxxxxxnns66s').send({
      subject: 'Meeting',
      message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
      recipients: 'ted@epicmail.com'
    }).end((err, res) => {
      _chai.assert.equal(res.status, 401);
      _chai.assert.equal(res.body.error, 'token not verified');
      done(err);
    });
  });

  (0, _mocha.it)('it should return an error if token is not provided', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/messages').send({
      subject: 'Meeting',
      message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
      recipients: 'ted@epicmail.com'
    }).end((err, res) => {
      _chai.assert.equal(res.status, 403);
      _chai.assert.equal(res.body.error, 'No authorization is provided');
      done(err);
    });
  });
  (0, _mocha.it)('it sends/create message', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/messages').set('authorization', `Bearer ${token}`).send({
      subject: 'Meeting',
      message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
      recipients: 'ted@epicmail.com'
    }).end((err, res) => {
      _chai.assert.equal(res.body.data[0].message, 'Message sent');
      _chai.assert.equal(res.status, 201);
      done(err);
    });
  });

  (0, _mocha.it)('it should return BadRequestError if subject  is empty', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/messages').set('authorization', `Bearer ${token}`).send({
      subject: '',
      message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
      recipients: 'ted@epicmail.com'
    }).end((err, res) => {
      _chai.assert.equal(res.body.errors.subject, 'subject should be provided and must be minimum of 2 to maximum 50 characters');
      _chai.assert.equal(res.status, 400);
      done(err);
    });
  });

  (0, _mocha.it)('it should return BadRequestError if message  is empty', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/messages').set('authorization', `Bearer ${token}`).send({
      subject: 'meeting',
      message: '',
      recipients: 'ted@epicmail.com'
    }).end((err, res) => {
      _chai.assert.equal(res.body.errors.message, 'message should be provided');
      _chai.assert.equal(res.status, 400);
      done(err);
    });
  });

  (0, _mocha.it)('it should return BadRequestError if recipients  is empty', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/messages').set('authorization', `Bearer ${token}`).send({
      subject: 'Meeting',
      message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
      recipients: ''
    }).end((err, res) => {
      _chai.assert.equal(res.body.errors.recipients, 'recipients should be email(s) and should be provided');
      _chai.assert.equal(res.status, 400);
      done(err);
    });
  });

  (0, _mocha.it)('it should return BadRequestError if subject is not provided', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/messages').set('authorization', `Bearer ${token}`).send({
      message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
      recipients: 'ted@epicmail.com'
    }).end((err, res) => {
      _chai.assert.equal(res.body.errors.subject, 'subject should be provided and must be minimum of 2 to maximum 50 characters');
      _chai.assert.equal(res.status, 400);
      done(err);
    });
  });

  (0, _mocha.it)('it should return BadRequestError if message is not provided', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/messages').set('authorization', `Bearer ${token}`).send({
      subject: 'Meeting',
      recipients: 'ted@epicmail.com'
    }).end((err, res) => {
      _chai.assert.equal(res.body.errors.message, 'message should be provided');
      _chai.assert.equal(res.status, 400);
      done(err);
    });
  });

  (0, _mocha.it)('it should return BadRequestError if recipients is not provided', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/messages').set('authorization', `Bearer ${token}`).send({
      subject: 'meeting',
      message: 'This is to inform you that there will be a staff meeting today at 2pm prompt'
    }).end((err, res) => {
      _chai.assert.equal(res.body.errors.recipients, 'recipients should be email(s) and should be provided');
      _chai.assert.equal(res.status, 400);
      done(err);
    });
  });
  (0, _mocha.it)('it should return NotFoundError if no registered email is provided', done => {
    (0, _chai.request)(_app2.default).post('/api/v1/messages').set('authorization', `Bearer ${token}`).send({
      subject: 'Meeting',
      message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
      recipients: 'lily@email.com'
    }).end((err, res) => {
      _chai.assert.equal(res.body.error, 'No registered email was found');
      _chai.assert.equal(res.status, 404);
      done(err);
    });
  });
});