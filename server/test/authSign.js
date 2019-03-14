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
        email: 'princechekwas@epicmail.com',
        password: 'password',
      })
      .end((err, res) => {
        assert.equal(res.body.data[0].message, 'login was successful');
        assert.equal(res.status, 201);
        assert.isArray(res.body.data);
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
        assert.equal(res.body.errors.email, 'A valid email type should be provided');
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
        assert.equal(res.body.errors.password, 'Password should not be empty');
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
        assert.equal(res.body.errors.email, 'A valid email type should be provided');
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
        assert.equal(res.body.errors.password, 'Password should not be empty');
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
