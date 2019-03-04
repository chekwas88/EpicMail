import { describe, it } from 'mocha';
import { use, request, assert } from 'chai';
import chaihttp from 'chai-http';
import app from '../app';

use(chaihttp);


describe('Post api/v1/auth/login', () => {
  it('it log\'s in a user', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'princechekwas@gmail.com',
        password: 'password',
      })
      .end((err, res) => {
        assert.equal(res.body.message, 'login was successful');
        assert.equal(res.status, 201);
        assert.isObject(res.body);
        assert.equal(res.body.authUser.firstname, 'Chisom');
        assert.equal(res.body.authUser.lastname, 'Onwuchekwa');
        done(err);
      });
  });

  it('it should return BadRequestError if email  is empty', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: '',
        password: 'password',
      })
      .end((err, res) => {
        assert.equal(res.body.error, 'BadRequest: "email" is not allowed to be empty');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if password  is empty', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'princechekwas@gmail.com',
        password: '',
      })
      .end((err, res) => {
        assert.equal(res.body.error, 'BadRequest: "password" is not allowed to be empty');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if email is not provided', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        password: 'password',
      })
      .end((err, res) => {
        assert.equal(res.body.error, 'BadRequest: "email" is required');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if password is not provided', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'princechekwas@gmail.com',
      })
      .end((err, res) => {
        assert.equal(res.body.error, 'BadRequest: "password" is required');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return AuthenticationError if user email is invalid', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'prince@mail.com',
        password: 'password',
      })
      .end((err, res) => {
        assert.equal(res.body.error, 'AuthenticationError: invalid email or password');
        assert.equal(res.status, 403);
        done(err);
      });
  });

  it('it should return AuthenticationError if user password is invalid', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'princechekwas@gmail.com',
        password: 'pass',
      })
      .end((err, res) => {
        assert.equal(res.body.error, 'AuthenticationError: invalid email or password');
        assert.equal(res.status, 403);
        done(err);
      });
  });
});
