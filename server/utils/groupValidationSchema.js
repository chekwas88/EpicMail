import Joi from 'joi';

export const groupNameSchema = {
  name: Joi.string().required().max(50).trim(),
};

export const groupRoleSchema = {
  role: Joi.string().required().max(50).trim(),
};
