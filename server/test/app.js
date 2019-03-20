import { describe, it } from 'mocha';
import { use, request, assert } from 'chai';
import chaihttp from 'chai-http';
import app from '../app';

use(chaihttp);

describe('A) GET index', () => {
  it('should return 200 and success message for the / route', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.message, 'Welcome to EPIC MAIL');
        done(err);
      });
  });

  it('should return a 404 for all invalid routes', (done) => {
    request(app)
      .post('/api/v1/endpoint')
      .end((err, res) => {
        assert.equal(res.status, 404);
        assert.equal(res.body.message, 'No such endpoint exist');
        done(err);
      });
  });
});
