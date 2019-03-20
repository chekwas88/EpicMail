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

(0, _mocha.describe)('GET api/v1/messages/sent', () => {
  (0, _mocha.before)(done => {
    (0, _chai.request)(_app2.default).post('/api/v1/auth/login').send({ email: 'ted@epicmail.com', password: '123456' }).end((err, res) => {
      // eslint-disable-next-line prefer-destructuring
      token = res.body.data[0].token;
      done(err);
    });
  });

  (0, _mocha.it)('it should return an error if token cannot be verifed', done => {
    (0, _chai.request)(_app2.default).get('/api/v1/messages/sent').set('authorization', 'Bearer jxxxxxxxxxxxxnns66s').end((err, res) => {
      _chai.assert.equal(res.status, 401);
      _chai.assert.equal(res.body.error, 'token not verified');
      done(err);
    });
  });

  (0, _mocha.it)('it should return an error if token is not provided', done => {
    (0, _chai.request)(_app2.default).get('/api/v1/messages/sent').end((err, res) => {
      _chai.assert.equal(res.status, 403);
      _chai.assert.equal(res.body.error, 'No authorization is provided');
      done(err);
    });
  });

  (0, _mocha.it)('it gets all sent messages', done => {
    (0, _chai.request)(_app2.default).get('/api/v1/messages/sent').set('authorization', `Bearer ${token}`).end((err, res) => {
      _chai.assert.isArray(res.body.data[0].data);
      _chai.assert.equal(res.body.data[0].message, 'sent messages retrieved');
      _chai.assert.equal(res.status, 200);
      done(err);
    });
  });
});