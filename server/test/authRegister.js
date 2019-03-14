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
        email: 'ted@epicmail.com',
        password: 'pass',
        confirmpassword: 'pass',
        isAdmin: 'true',
      })
      .end((err, res) => {
        assert.equal(res.body.data[0].message, 'Account created successfully');
        assert.equal(res.status, 201);
        assert.isArray(res.body.data);
        done(err);
      });
  });
  it('it should return BadRequestError if firstname  is empty', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: '',
        lastname: 'Mosby',
        email: 'ted@epicmail.com',
        password: 'pass',
        confirmpassword: 'pass',
        isAdmin: 'true',
      })
      .end((err, res) => {
        assert.equal(
          res.body.errors.firstname,
          'Firstname should be of type string and has a minimum of 2 characters and maximum of 50 chracters',
        );
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
        email: 'ted@epicmail.com',
        password: 'pass',
        confirmpassword: 'pass',
      })
      .end((err, res) => {
        assert.equal(
          res.body.errors.lastname,
          'Lastname should be of type string and has a minimum of 2 and maximum of 50 characters',
        );
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
      })
      .end((err, res) => {
        assert.equal(res.body.errors.email, 'A valid email type should be provided');
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
        email: 'ted@epicmail.com',
        password: '',
        confirmpassword: 'pass',
      })
      .end((err, res) => {
        assert.equal(res.body.errors.password, 'Password should not be empty');
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
        email: 'ted@epicmail.com',
        password: 'pass',
        confirmpassword: '',
      })
      .end((err, res) => {
        assert.equal(res.body.errors.confirmpassword, 'confirmPassword should not be empty');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if  firstname is not provided', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        lastname: 'mosby',
        email: 'ted@epicmail.com',
        password: 'pass',
        confirmpassword: 'pass',
      })
      .end((err, res) => {
        assert.equal(
          res.body.errors.firstname,
          'Firstname should be of type string and has a minimum of 2 characters and maximum of 50 chracters',
        );
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if  lastname is not provided', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'ted',
        email: 'ted@epicmail.com',
        password: 'pass',
        confirmpassword: 'pass',
      })
      .end((err, res) => {
        assert.equal(
          res.body.errors.lastname,
          'Lastname should be of type string and has a minimum of 2 and maximum of 50 characters',
        );
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
      })
      .end((err, res) => {
        assert.equal(res.body.errors.email, 'A valid email type should be provided');
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
        email: 'ted@epicmail.com',
        confirmpassword: 'pass',
      })
      .end((err, res) => {
        assert.equal(res.body.errors.password, 'Password should not be empty');
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
        email: 'ted@epicmail.com',
        password: 'pass',
      })
      .end((err, res) => {
        assert.equal(res.body.errors.confirmpassword, 'confirmPassword should not be empty');
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
        email: 'ted@epicmail.com',
        password: 'pass',
        confirmpassword: 'password',
      })
      .end((err, res) => {
        assert.equal(res.body.error, 'AuthenticationError: password and confirmpassword should be same');
        assert.equal(res.status, 403);
        done(err);
      });
  });
});
