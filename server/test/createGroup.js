import { describe, it, before } from 'mocha';
import { use, request, assert } from 'chai';
import chaihttp from 'chai-http';
import app from '../app';

use(chaihttp);

let token;

describe('Post api/v1/groups', () => {
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
      .post('/api/v1/groups')
      .set('authorization', 'Bearer jxxxxxxxxxxxxnns66s')
      .send({
        name: 'cycle1',
      })
      .end((err, res) => {
        assert.equal(res.status, 401);
        assert.equal(res.body.error, 'token not verified');
        done(err);
      });
  });

  it('it should return an error if token is not provided', (done) => {
    request(app)
      .post('/api/v1/groups')
      .send({
        name: 'cycle1',
      })
      .end((err, res) => {
        assert.equal(res.status, 403);
        assert.equal(res.body.error, 'No authorization is provided');
        done(err);
      });
  });
  it('it creates a group', (done) => {
    request(app)
      .post('/api/v1/groups')
      .set('authorization', `Bearer ${token}`)
      .send({
        name: 'cycle1',
      })
      .end((err, res) => {
        assert.equal(res.body.data[0].message, 'Group created');
        assert.equal(res.status, 201);
        done(err);
      });
  });


  it('it should return BadRequestError if name is empty', (done) => {
    request(app)
      .post('/api/v1/groups')
      .set('authorization', `Bearer ${token}`)
      .send({
        name: '',
      })
      .end((err, res) => {
        assert.equal(res.body.errors.name, 'Group name should be provided');
        assert.equal(res.status, 400);
        done(err);
      });
  });


  it('it should return BadRequestError if subject is not provided', (done) => {
    request(app)
      .post('/api/v1/groups')
      .set('authorization', `Bearer ${token}`)
      .send({
      })
      .end((err, res) => {
        assert.equal(
          res.body.errors.name,
          'Group name should be provided',
        );
        assert.equal(res.status, 400);
        done(err);
      });
  });
});
