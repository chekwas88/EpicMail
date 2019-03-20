'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class NotFoundError {
  constructor(message) {
    this.name = 'NotFoundError';
    this.message = message;
  }
}

class BadRequestError {
  constructor(message) {
    this.name = 'BadRequest';
    this.message = message;
  }
}

class AuthenticationError {
  constructor(message) {
    this.name = 'AuthenticationError';
    this.message = message;
  }
}

class UnAuthorizedError {
  constructor(message) {
    this.name = 'UnAuthorizedError';
    this.message = message;
  }
}

NotFoundError.prototype = new Error();
BadRequestError.prototype = new Error();
AuthenticationError.prototype = new Error();
UnAuthorizedError.prototype = new Error();

exports.default = {
  NotFoundError,
  AuthenticationError,
  BadRequestError,
  UnAuthorizedError
};