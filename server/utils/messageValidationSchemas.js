import Joi from 'joi';

export const createdOnSchema = {
  createdOn: Joi.string().required().trim(),
};

export const subjectSchema = {
  subject: Joi
    .string()
    .required()
    .min(2)
    .max(100)
    .trim(),
};
export const messageSchema = {
  message: Joi.string().required(),
};
export const statusSchema = {
  status: Joi.string().required().trim(),
};

export const parentMessageIdSchema = {
  parentMessageId: Joi.number().integer(),
};

export const recipientsSchema = {
  recipients: Joi.array().items(Joi.string().email()).single().required(),
};
