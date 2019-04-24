import { describe, it, before } from 'mocha';
import { use, request, assert } from 'chai';
import chaihttp from 'chai-http';
import app from '../app';

use(chaihttp);

let token;

describe('PATCH api/v1/groups/:id/name', () => {
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
      .patch('/api/v1/groups/1/name')
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
      .patch('/api/v1/groups/1/name')
      .send({
        name: 'cycle2',
      })
      .end((err, res) => {
        assert.equal(res.status, 403);
        assert.equal(res.body.error, 'No authorization is provided');
        done(err);
      });
  });
  it('it updates a group', (done) => {
    request(app)
      .patch('/api/v1/groups/1/name')
      .set('authorization', `Bearer ${token}`)
      .send({
        name: 'cycle1',
      })
      .end((err, res) => {
        assert.equal(res.body.data[0].message, 'Group updated');
        assert.equal(res.status, 200);
        done(err);
      });
  });


  it('it should return BadRequestError if name is empty', (done) => {
    request(app)
      .patch('/api/v1/groups/1/name')
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
      .patch('/api/v1/groups/1/name')
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
