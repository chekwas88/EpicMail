import { describe, it, before } from 'mocha';
import { use, request, assert } from 'chai';
import chaihttp from 'chai-http';
import app from '../app';

use(chaihttp);
let token;

describe('GET /api/v1/groups/:id/users', () => {
  before((done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'ted123@epicmail.com', password: '123456' })
      .end((err, res) => {
        // eslint-disable-next-line prefer-destructuring
        token = res.body.data[0].token;
        done(err);
      });
  });
  it('it should return an error if token cannot be verifed', (done) => {
    request(app)
      .get('/api/v1/groups/1/users')
      .set('authorization', 'Bearer jxxxxxxxxxxxxnns66s')
      .end((err, res) => {
        assert.equal(res.status, 401);
        assert.equal(res.body.error, 'token not verified');
        done(err);
      });
  });

  it('it should return an error if token is not provided', (done) => {
    request(app)
      .get('/api/v1/groups/1/users')
      .end((err, res) => {
        assert.equal(res.status, 403);
        assert.equal(res.body.error, 'No authorization is provided');
        done(err);
      });
  });
  it('it gets all the  groups of a user', (done) => {
    request(app)
      .get('/api/v1/groups/1/users')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        assert.isArray(res.body.data);
        assert.equal(res.body.data[0].message, 'members retrieved');
        assert.equal(res.status, 200);
        done(err);
      });
  });

  it('it throws not found error a messages', (done) => {
    request(app)
      .get('/api/v1/groups/1001/users')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (!res.body.data) {
          assert.equal(res.body.error, 'no group member found');
          assert.equal(res.status, 404);
        }
        done(err);
      });
  });
});
