import Joi from 'joi';

export const firstnameSchema = {
  firstname: Joi
    .string()
    .min(2)
    .max(50)
    .required()
    .trim()
    .regex(/^[a-zA-Z]+$/),
};
export const lastnameSchema = {
  lastname: Joi
    .string()
    .min(2)
    .max(50)
    .required()
    .trim()
    .regex(/^[a-zA-Z]+$/),
};
export const emailSchema = {
  email: Joi.string().email().required(),
};
export const passwordSchema = {
  password: Joi.string().required().trim(),
};
export const cpasswordSchema = {
  confirmpassword: Joi.string().required().trim(),
};
