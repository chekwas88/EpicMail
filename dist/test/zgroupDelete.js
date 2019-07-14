"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _chai.use)(_chaiHttp["default"]);
var token;
(0, _mocha.describe)('DELETE api/v1/groups/:id', function () {
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
    (0, _chai.request)(_app["default"])["delete"]('/api/v1/groups/1').set('authorization', 'Bearer jxxxxxxxxxxxxnns66s').end(function (err, res) {
      _chai.assert.equal(res.status, 401);

      _chai.assert.equal(res.body.error, 'token not verified');

      done(err);
    });
  });
  (0, _mocha.it)('it should return an error if token is not provided', function (done) {
    (0, _chai.request)(_app["default"])["delete"]('/api/v1/groups/1').end(function (err, res) {
      _chai.assert.equal(res.status, 403);

      _chai.assert.equal(res.body.error, 'No authorization is provided');

      done(err);
    });
  });
  (0, _mocha.it)('it deletes a messages', function (done) {
    (0, _chai.request)(_app["default"])["delete"]('/api/v1/groups/1').set('authorization', "Bearer ".concat(token)).end(function (err, res) {
      _chai.assert.equal(res.body.data[0].message, 'Group deleted');

      _chai.assert.equal(res.status, 200);

      done(err);
    });
  });
  (0, _mocha.it)('it throws not found error a messages', function (done) {
    (0, _chai.request)(_app["default"])["delete"]('/api/v1/groups/1001').set('authorization', "Bearer ".concat(token)).end(function (err, res) {
      if (!res.body.data) {
        _chai.assert.equal(res.body.error, 'no such group exist');

        _chai.assert.equal(res.status, 404);
      }

      done(err);
    });
  });
});