import { describe, it, before } from 'mocha';
import { use, request, assert } from 'chai';
import chaihttp from 'chai-http';
import app from '../app';

use(chaihttp);
let token;

describe('GET api/v1/messages/:id', () => {
  before((done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'corvinus@epicmail.com', password: '123456' })
      .end((err, res) => {
        // eslint-disable-next-line prefer-destructuring
        token = res.body.data[0].token;
        done(err);
      });
  });
  it('it should return an error if token cannot be verifed', (done) => {
    request(app)
      .delete('/api/v1/messages/1')
      .set('authorization', 'Bearer jxxxxxxxxxxxxnns66s')
      .end((err, res) => {
        assert.equal(res.status, 401);
        assert.equal(res.body.error, 'token not verified');
        done(err);
      });
  });

  it('it should return an error if token is not provided', (done) => {
    request(app)
      .delete('/api/v1/messages/1')
      .end((err, res) => {
        assert.equal(res.status, 403);
        assert.equal(res.body.error, 'No authorization is provided');
        done(err);
      });
  });

  it('it deletes a messages', (done) => {
    request(app)
      .delete('/api/v1/messages/13')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        assert.equal(res.body.data[0].message, 'message deleted');
        assert.equal(res.status, 200);
        done(err);
      });
  });

  it('it throws not found error a messages', (done) => {
    request(app)
      .delete('/api/v1/messages/1001')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (!res.body.data) {
          assert.equal(res.body.error, 'no such message was found');
          assert.equal(res.status, 404);
        }
        done(err);
      });
  });
});
