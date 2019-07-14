"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _chai.use)(_chaiHttp["default"]);
(0, _mocha.describe)('A) GET index', function () {
  (0, _mocha.it)('should return 200 and success message for the / route', function (done) {
    (0, _chai.request)(_app["default"]).get('/').end(function (err, res) {
      _chai.assert.equal(res.status, 200);

      _chai.assert.equal(res.body.message, 'Welcome to EPIC MAIL');

      done(err);
    });
  });
  (0, _mocha.it)('should return a 404 for all invalid routes', function (done) {
    (0, _chai.request)(_app["default"]).post('/api/v1/endpoint').end(function (err, res) {
      _chai.assert.equal(res.status, 404);

      _chai.assert.equal(res.body.message, 'No such endpoint exist');

      done(err);
    });
  });
});