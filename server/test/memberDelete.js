import { describe, it, before } from 'mocha';
import { use, request, assert } from 'chai';
import chaihttp from 'chai-http';
import app from '../app';

use(chaihttp);
let token;

describe('DELETE api/v1/groups/:groupid/users/:id', () => {
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
      .delete('/api/v1/groups/1/users/3')
      .set('authorization', 'Bearer jxxxxxxxxxxxxnns66s')
      .end((err, res) => {
        assert.equal(res.status, 401);
        assert.equal(res.body.error, 'token not verified');
        done(err);
      });
  });

  it('it should return an error if token is not provided', (done) => {
    request(app)
      .delete('/api/v1/groups/1/users/3')
      .end((err, res) => {
        assert.equal(res.status, 403);
        assert.equal(res.body.error, 'No authorization is provided');
        done(err);
      });
  });

  it('it deletes a group member', (done) => {
    request(app)
      .delete('/api/v1/groups/1/users/3')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        assert.equal(res.body.data[0].message, 'Member deleted');
        assert.equal(res.status, 200);
        done(err);
      });
  });
});
