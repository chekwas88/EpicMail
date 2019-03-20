import Joi from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const groupNameSchema = {
  name: Joi.string().required().max(50).trim(),
};
