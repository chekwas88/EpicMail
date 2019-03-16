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
        firstName: 'Ted',
        lastName: 'Mosby',
        email: 'ted@epicmail.com',
        password: 'pass',
        confirmPassword: 'pass',
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
        firstName: '',
        lastName: 'Mosby',
        email: 'ted@epicmail.com',
        password: 'pass',
        confirmPassword: 'pass',
      })
      .end((err, res) => {
        assert.equal(
          res.body.errors.firstName,
          'Firstname should be provided and should have minimum of 2 characters and maximum of 50 chracters and is required',
        );
        assert.equal(res.status, 400);
        done(err);
      });
  });
  it('it should return BadRequestError if lastname  is empty', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'ted',
        lastName: '',
        email: 'ted@epicmail.com',
        password: 'pass',
        confirmPassword: 'pass',
      })
      .end((err, res) => {
        assert.equal(
          res.body.errors.lastName,
          'Lastname should be provided and should have minimum of 2 and maximum of 50 characters and is required',
        );
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if email  is empty', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'ted',
        lastName: 'mosby',
        email: '',
        password: 'pass',
        confirmPassword: 'pass',
      })
      .end((err, res) => {
        assert.equal(res.body.errors.email, 'Email should be provided and should be a valid email type');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if password is empty', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'ted',
        lastName: 'mosby',
        email: 'ted@epicmail.com',
        password: '',
        confirmPassword: 'pass',
      })
      .end((err, res) => {
        assert.equal(res.body.errors.password, 'Password should be provided and should have minimum of 6 characters');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if confirmpassword is empty', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'ted',
        lastName: 'mosby',
        email: 'ted@epicmail.com',
        password: 'pass',
        confirmPassword: '',
      })
      .end((err, res) => {
        assert.equal(res.body.errors.confirmPassword, 'confirmPassword should be provided and should have minimum of 6 characters');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if  firstname is not provided', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        lastName: 'mosby',
        email: 'ted@epicmail.com',
        password: 'pass',
        confirmPassword: 'pass',
      })
      .end((err, res) => {
        assert.equal(
          res.body.errors.firstName,
          'Firstname should be provided and should have minimum of 2 characters and maximum of 50 chracters and is required',
        );
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if  lastname is not provided', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'ted',
        email: 'ted@epicmail.com',
        password: 'pass',
        confirmPassword: 'pass',
      })
      .end((err, res) => {
        assert.equal(
          res.body.errors.lastName,
          'Lastname should be provided and should have minimum of 2 and maximum of 50 characters and is required',
        );
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if  email is not provided', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'ted',
        lastName: 'mosby',
        password: 'pass',
        confirmPassword: 'pass',
      })
      .end((err, res) => {
        assert.equal(res.body.errors.email, 'Email should be provided and should be a valid email type');
        assert.equal(res.status, 400);
        done(err);
      });
  });
  it('it should return BadRequestError if  password is not provided', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'ted',
        lastName: 'mosby',
        email: 'ted@epicmail.com',
        confirmPassword: 'pass',
      })
      .end((err, res) => {
        assert.equal(res.body.errors.password, 'Password should be provided and should have minimum of 6 characters');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if  confrimpassword is not provided', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'ted',
        lastName: 'mosby',
        email: 'ted@epicmail.com',
        password: 'pass',
      })
      .end((err, res) => {
        assert.equal(res.body.errors.confirmPassword, 'confirmPassword should be provided and should have minimum of 6 characters');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if  email has been registered before', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'ted',
        lastName: 'mosby',
        email: 'princechekwas@epicmail.com',
        password: 'password',
        confirmPassword: 'password',
      })
      .end((err, res) => {
        assert.equal(res.body.error, 'BadRequest: email has been registered before');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if  password is not equal to confirmpassword', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'ted',
        lastName: 'mosby',
        password: 'pass',
        confirmPassword: 'password',
        email: 'teddy@epicmail.com',
      })
      .end((err, res) => {
        assert.equal(res.body.error, 'BadRequest: password and confirmpassword should be same');
        assert.equal(res.status, 400);
        done(err);
      });
  });
});
