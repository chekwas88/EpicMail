import { describe, it, before } from 'mocha';
import { use, request, assert } from 'chai';
import chaihttp from 'chai-http';
import app from '../app';

use(chaihttp);
let token;

describe('GET api/v1/messages', () => {
  before((done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'princechekwas@epicmail.com', password: 'password' })
      .end((err, res) => {
        // eslint-disable-next-line prefer-destructuring
        token = res.body.data[0].token;
        done(err);
      });
  });
  it('it should return an error if token cannot be verifed', (done) => {
    request(app)
      .get('/api/v1/messages')
      .set('authorization', 'Bearer jxxxxxxxxxxxxnns66s')
      .end((err, res) => {
        assert.equal(res.status, 401);
        assert.equal(res.body.error, 'AuthenticationError: token not verified');
        done(err);
      });
  });

  it('it should return an error if token is not provided', (done) => {
    request(app)
      .get('/api/v1/messages')
      .end((err, res) => {
        assert.equal(res.status, 403);
        assert.equal(res.body.error, 'UnAuthorizedError: No authorization is provided');
        done(err);
      });
  });
  it('it gets all received messages', (done) => {
    request(app)
      .get('/api/v1/messages')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        assert.isArray(res.body.data);
        assert.equal(res.body.data[0].message, 'inbox messages retrieved');
        assert.equal(res.status, 200);
        done(err);
      });
  });

  it('it returns empty if no data is returned', (done) => {
    request(app)
      .get('/api/v1/messages')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (res.body.data[0].data.length === 0) {
          assert.equal(res.body.data[0].message, 'Your inbox is empty');
        }
        assert.equal(res.status, 200);
        done(err);
      });
  });
});
