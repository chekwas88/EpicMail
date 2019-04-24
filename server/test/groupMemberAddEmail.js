import { describe, it, before } from 'mocha';
import { use, request, assert } from 'chai';
import chaihttp from 'chai-http';
import app from '../app';

use(chaihttp);

let token;

describe('Post /api/v1/groups/1/users', () => {
  before((done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'te123@epicmail.com', password: '123456' })
      .end((err, res) => {
        // eslint-disable-next-line prefer-destructuring
        token = res.body.data[0].token;
        done(err);
      });
  });

  it('it should return an error if token cannot be verifed', (done) => {
    request(app)
      .post('/api/v1/groups/1/users')
      .set('authorization', 'Bearer jxxxxxxxxxxxxnns66s')
      .send({
        email: 'ted123@epicmail.com',
        role: 'member',
      })
      .end((err, res) => {
        assert.equal(res.status, 401);
        assert.equal(res.body.error, 'token not verified');
        done(err);
      });
  });

  it('it should return an error if token is not provided', (done) => {
    request(app)
      .post('/api/v1/groups/1/users')
      .send({
        email: 'ted123@epicmail.com',
        role: 'member',
      })
      .end((err, res) => {
        assert.equal(res.status, 403);
        assert.equal(res.body.error, 'No authorization is provided');
        done(err);
      });
  });
  it('it adds a member to a group', (done) => {
    request(app)
      .post('/api/v1/groups/1/users')
      .set('authorization', `Bearer ${token}`)
      .send({
        email: 'ted123@epicmail.com',
        role: 'member',
      })
      .end((err, res) => {
        assert.equal(res.body.data[0].message, 'Member added');
        assert.equal(res.status, 201);
        done(err);
      });
  });


  it('it should return BadRequestError if email is empty', (done) => {
    request(app)
      .post('/api/v1/groups/1/users')
      .set('authorization', `Bearer ${token}`)
      .send({
        email: '',
        role: 'member',
      })
      .end((err, res) => {
        assert.equal(res.body.errors.email, 'Email should be provided and should be a valid email type');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if role is empty', (done) => {
    request(app)
      .post('/api/v1/groups/1/users')
      .set('authorization', `Bearer ${token}`)
      .send({
        email: 'marshall@epicmail.com',
        role: '',
      })
      .end((err, res) => {
        assert.equal(res.body.errors.role, 'Member\'s role should be provided');
        assert.equal(res.status, 400);
        done(err);
      });
  });


  it('it should return BadRequestError if name is not provided', (done) => {
    request(app)
      .post('/api/v1/groups/1/users')
      .set('authorization', `Bearer ${token}`)
      .send({
        role: 'member',
      })
      .end((err, res) => {
        assert.equal(
          res.body.errors.email,
          'Email should be provided and should be a valid email type',
        );
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if role is not provided', (done) => {
    request(app)
      .post('/api/v1/groups/1/users')
      .set('authorization', `Bearer ${token}`)
      .send({
        email: 'ted123@epicmail.com',
      })
      .end((err, res) => {
        assert.equal(
          res.body.errors.role,
          'Member\'s role should be provided',
        );
        assert.equal(res.status, 400);
        done(err);
      });
  });
});
