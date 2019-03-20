import Joi from 'joi';


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

export const recipientsSchema = {
  recipients: Joi.string().email().required().trim(),
};
