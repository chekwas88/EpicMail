import { describe, it } from 'mocha';
import { use, request, assert } from 'chai';
import chaihttp from 'chai-http';
import app from '../app';

use(chaihttp);


describe('Post api/v1/auth/signup', () => {
  it('it register\'s a user', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Ted',
        lastname: 'Mosby',
        email: 'ted@mail.com',
        password: 'pass',
        confirmpassword: 'pass',
        isAdmin: 'true',
      })
      .end((err, res) => {
        assert.equal(res.body.message, 'Account created successfully');
        assert.equal(res.status, 201);
        assert.isObject(res.body);
        done(err);
      });
  });
  it('it should return BadRequestError if firstname  is empty', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: '',
        lastname: 'Mosby',
        email: 'ted@mail.com',
        password: 'pass',
        confirmpassword: 'pass',
        isAdmin: 'true',
      })
      .end((err, res) => {
        assert.equal(res.body.error, 'BadRequest: "firstname" is not allowed to be empty');
        assert.equal(res.status, 400);
        done(err);
      });
  });
  it('it should return BadRequestError if lastname  is empty', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'ted',
        lastname: '',
        email: 'ted@mail.com',
        password: 'pass',
        confirmpassword: 'pass',
        isAdmin: 'true',
      })
      .end((err, res) => {
        assert.equal(res.body.error, 'BadRequest: "lastname" is not allowed to be empty');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if email  is empty', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'ted',
        lastname: 'mosby',
        email: '',
        password: 'pass',
        confirmpassword: 'pass',
        isAdmin: 'true',
      })
      .end((err, res) => {
        assert.equal(res.body.error, 'BadRequest: "email" is not allowed to be empty');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if password is empty', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'ted',
        lastname: 'mosby',
        email: 'ted@mail.com',
        password: '',
        confirmpassword: 'pass',
        isAdmin: 'true',
      })
      .end((err, res) => {
        assert.equal(res.body.error, 'BadRequest: "password" is not allowed to be empty');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if confirmpassword is empty', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'ted',
        lastname: 'mosby',
        email: 'ted@mail.com',
        password: 'pass',
        confirmpassword: '',
        isAdmin: 'true',
      })
      .end((err, res) => {
        assert.equal(res.body.error, 'BadRequest: "confirmpassword" is not allowed to be empty');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if admin is empty', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'ted',
        lastname: 'mosby',
        email: 'ted@mail.com',
        password: 'pass',
        confirmpassword: 'pass',
        isAdmin: '',
      })
      .end((err, res) => {
        assert.equal(res.body.error, 'BadRequest: "isAdmin" must be a boolean');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if  firstname is not provided', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        lastname: 'mosby',
        email: 'ted@mail.com',
        password: 'pass',
        confirmpassword: 'pass',
        isAdmin: 'true',
      })
      .end((err, res) => {
        assert.equal(res.body.error, 'BadRequest: "firstname" is required');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if  lastname is not provided', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'ted',
        email: 'ted@mail.com',
        password: 'pass',
        confirmpassword: 'pass',
        isAdmin: 'true',
      })
      .end((err, res) => {
        assert.equal(res.body.error, 'BadRequest: "lastname" is required');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if  email is not provided', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'ted',
        lastname: 'mosby',
        password: 'pass',
        confirmpassword: 'pass',
        isAdmin: 'true',
      })
      .end((err, res) => {
        assert.equal(res.body.error, 'BadRequest: "email" is required');
        assert.equal(res.status, 400);
        done(err);
      });
  });
  it('it should return BadRequestError if  password is not provided', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'ted',
        lastname: 'mosby',
        email: 'ted@mail.com',
        confirmpassword: 'pass',
        isAdmin: 'true',
      })
      .end((err, res) => {
        assert.equal(res.body.error, 'BadRequest: "password" is required');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if  confrimpassword is not provided', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'ted',
        lastname: 'mosby',
        email: 'ted@mail.com',
        password: 'pass',
        isAdmin: 'true',
      })
      .end((err, res) => {
        assert.equal(res.body.error, 'BadRequest: "confirmpassword" is required');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if  isAdmin is not provided', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'ted',
        lastname: 'mosby',
        email: 'ted@mail.com',
        password: 'pass',
        confirmpassword: 'pass',
      })
      .end((err, res) => {
        assert.equal(res.body.error, 'BadRequest: "isAdmin" is required');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return AuthenticationError if  password is not equal to confirmpassword', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'ted',
        lastname: 'mosby',
        email: 'ted@mail.com',
        password: 'pass',
        confirmpassword: 'password',
        isAdmin: 'true',
      })
      .end((err, res) => {
        assert.equal(res.body.error, 'AuthenticationError: Please confirm your password');
        assert.equal(res.status, 403);
        done(err);
      });
  });
});
