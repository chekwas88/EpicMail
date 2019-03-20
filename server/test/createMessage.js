import { describe, it, before } from 'mocha';
import { use, request, assert } from 'chai';
import chaihttp from 'chai-http';
import app from '../app';

use(chaihttp);

let token;

describe('Post api/v1/messages', () => {
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
      .post('/api/v1/messages')
      .set('authorization', 'Bearer jxxxxxxxxxxxxnns66s')
      .send({
        subject: 'Meeting',
        message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
        recipients: 'lily@epicmail.com',
      })
      .end((err, res) => {
        assert.equal(res.status, 401);
        assert.equal(res.body.error, 'token not verified');
        done(err);
      });
  });

  it('it should return an error if token is not provided', (done) => {
    request(app)
      .post('/api/v1/messages')
      .send({

        subject: 'Meeting',
        message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
        recipients: 'lily@epicmail.com',
      })
      .end((err, res) => {
        assert.equal(res.status, 403);
        assert.equal(res.body.error, 'No authorization is provided');
        done(err);
      });
  });
  it('it sends/create message', (done) => {
    request(app)
      .post('/api/v1/messages')
      .set('authorization', `Bearer ${token}`)
      .send({
        subject: 'Meeting',
        message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
        recipients: 'lily@epicmail.com',
      })
      .end((err, res) => {
        assert.equal(res.body.data[0].message, 'Message sent');
        assert.equal(res.status, 201);
        done(err);
      });
  });

  it('it should return BadRequestError if subject  is empty', (done) => {
    request(app)
      .post('/api/v1/messages')
      .set('authorization', `Bearer ${token}`)
      .send({
        subject: '',
        message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
        recipients: 'lily@epicmail.com',
      })
      .end((err, res) => {
        assert.equal(res.body.errors.subject, 'subject should be provided and must be minimum of 2 to maximum 50 characters');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if message  is empty', (done) => {
    request(app)
      .post('/api/v1/messages')
      .set('authorization', `Bearer ${token}`)
      .send({
        subject: 'meeting',
        message: '',
        status: 'draft',
        recipients: 'lily@epicmail.com',
      })
      .end((err, res) => {
        assert.equal(res.body.errors.message, 'message should be provided');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if recipients  is empty', (done) => {
    request(app)
      .post('/api/v1/messages')
      .set('authorization', `Bearer ${token}`)
      .send({
        subject: 'Meeting',
        message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
        recipients: '',
      })
      .end((err, res) => {
        assert.equal(
          res.body.errors.recipients,
          'recipients should be email(s) and should be provided',
        );
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if subject is not provided', (done) => {
    request(app)
      .post('/api/v1/messages')
      .set('authorization', `Bearer ${token}`)
      .send({
        createdOn: '03/09/2019',
        message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
        status: 'draft',
        recipients: 'lily@epicmail.com',
      })
      .end((err, res) => {
        assert.equal(
          res.body.errors.subject,
          'subject should be provided and must be minimum of 2 to maximum 50 characters',
        );
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if message is not provided', (done) => {
    request(app)
      .post('/api/v1/messages')
      .set('authorization', `Bearer ${token}`)
      .send({
        createdOn: '03/09/2019',
        subject: 'Meeting',
        status: 'draft',
        recipients: 'lily@epicmail.com',
      })
      .end((err, res) => {
        assert.equal(res.body.errors.message, 'message should be provided');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if recipients is not provided', (done) => {
    request(app)
      .post('/api/v1/messages')
      .set('authorization', `Bearer ${token}`)
      .send({
        createdOn: '03/09/2019',
        subject: 'meeting',
        message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
      })
      .end((err, res) => {
        assert.equal(
          res.body.errors.recipients,
          'recipients should be email(s) and should be provided',
        );
        assert.equal(res.status, 400);
        done(err);
      });
  });
  it('it should return NotFoundError if no registered email is provided', (done) => {
    request(app)
      .post('/api/v1/messages')
      .set('authorization', `Bearer ${token}`)
      .send({
        subject: 'Meeting',
        message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
        recipients: 'lily@email.com',
      })
      .end((err, res) => {
        assert.equal(res.body.error, 'No registered email was found');
        assert.equal(res.status, 404);
        done(err);
      });
  });
});
