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
      .send({ email: 'princechekwas@epicmail.com', password: 'password' })
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
        createdOn: '03/09/2019',
        subject: 'Meeting',
        message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
        status: 'draft',
        recipients: ['lily@epicmail.com'],
      })
      .end((err, res) => {
        assert.equal(res.status, 401);
        assert.equal(res.body.error, 'UnAuthorizedError: token not verified');
        done(err);
      });
  });

  it('it should return an error if token is not provided', (done) => {
    request(app)
      .post('/api/v1/messages')
      .send({
        createdOn: '03/09/2019',
        subject: 'Meeting',
        message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
        status: 'draft',
        recipients: 'lily@epicmail.com',
      })
      .end((err, res) => {
        assert.equal(res.status, 401);
        assert.equal(res.body.error, 'UnAuthorizedError: No authorization is provided');
        done(err);
      });
  });
  it('it sends/create message', (done) => {
    request(app)
      .post('/api/v1/messages')
      .set('authorization', `Bearer ${token}`)
      .send({
        createdOn: '03/09/2019',
        subject: 'Meeting',
        message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
        status: 'draft',
        recipients: 'lily@epicmail.com',
      })
      .end((err, res) => {
        assert.equal(res.body.data[0].message, 'Message created');
        assert.equal(res.status, 201);
        done(err);
      });
  });

  it('it should return BadRequestError if createdOn  is empty', (done) => {
    request(app)
      .post('/api/v1/messages')
      .set('authorization', `Bearer ${token}`)
      .send({
        createdOn: '',
        subject: 'Meeting',
        message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
        status: 'draft',
        recipients: 'lily@epicmail.com',
      })
      .end((err, res) => {
        assert.equal(res.body.errors.createdOn, 'createdOn should not be empty');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if subject  is empty', (done) => {
    request(app)
      .post('/api/v1/messages')
      .set('authorization', `Bearer ${token}`)
      .send({
        createdOn: '03/09/2019',
        subject: '',
        message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
        status: 'draft',
        recipients: 'lily@epicmail.com',
      })
      .end((err, res) => {
        assert.equal(res.body.errors.subject, 'subject should not be empty and must be minimum of 2 to maximum 50 characters');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if message  is empty', (done) => {
    request(app)
      .post('/api/v1/messages')
      .set('authorization', `Bearer ${token}`)
      .send({
        createdOn: '03/09/2019',
        subject: 'meeting',
        message: '',
        status: 'draft',
        recipients: 'lily@epicmail.com',
      })
      .end((err, res) => {
        assert.equal(res.body.errors.message, 'message should not be empty');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if status is empty', (done) => {
    request(app)
      .post('/api/v1/messages')
      .set('authorization', `Bearer ${token}`)
      .send({
        createdOn: '03/09/2019',
        subject: 'meeting',
        message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
        status: '',
        recipients: 'lily@epicmail.com',
      })
      .end((err, res) => {
        assert.equal(res.body.errors.status, 'status should not be empty');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if recipients  is empty', (done) => {
    request(app)
      .post('/api/v1/messages')
      .set('authorization', `Bearer ${token}`)
      .send({
        createdOn: '03/09/2019',
        subject: 'Meeting',
        message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
        status: 'draft',
        recipients: '',
      })
      .end((err, res) => {
        assert.equal(
          res.body.errors.recipients,
          'recipients should be an array of emails and should not be empty',
        );
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if createdOn is not provided', (done) => {
    request(app)
      .post('/api/v1/messages')
      .set('authorization', `Bearer ${token}`)
      .send({
        subject: 'Meeting',
        message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
        status: 'draft',
        recipients: 'lily@epicmail.com',
      })
      .end((err, res) => {
        assert.equal(res.body.errors.createdOn, 'createdOn should not be empty');
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
        recipients: ['lily@epicmail.com'],
      })
      .end((err, res) => {
        assert.equal(
          res.body.errors.subject,
          'subject should not be empty and must be minimum of 2 to maximum 50 characters',
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
        assert.equal(res.body.errors.message, 'message should not be empty');
        assert.equal(res.status, 400);
        done(err);
      });
  });

  it('it should return BadRequestError if status is not provided', (done) => {
    request(app)
      .post('/api/v1/messages')
      .set('authorization', `Bearer ${token}`)
      .send({
        createdOn: '03/09/2019',
        subject: 'meeting',
        message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
        recipients: 'lily@epicmail.com',
      })
      .end((err, res) => {
        assert.equal(res.body.errors.status, 'status should not be empty');
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
        status: 'draft',
      })
      .end((err, res) => {
        assert.equal(
          res.body.errors.recipients,
          'recipients should be an array of emails and should not be empty',
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
        createdOn: '03/09/2019',
        subject: 'Meeting',
        message: 'This is to inform you that there will be a staff meeting today at 2pm prompt',
        status: 'draft',
        recipients: 'lily@email.com',
      })
      .end((err, res) => {
        assert.equal(res.body.error, 'NotFoundError: No registered email address was found');
        assert.equal(res.status, 404);
        done(err);
      });
  });
});
