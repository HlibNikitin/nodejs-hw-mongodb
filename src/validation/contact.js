import Joi from 'joi';

export const createStudentSchema = Joi.object({
  name: Joi.string().required().min(3).max(20).messages({
    'string.base': 'Name should be a string.',
    'string.empty': 'Name cannot be empty.',
    'string.min': 'Name should have at least 3 characters.',
    'string.max': 'Name should not exceed 20 characters.',
  }),
  phoneNumber: Joi.string().required().min(3).max(20).messages({
    'string.base': 'Phone number should be a string.',
    'string.empty': 'Phone number cannot be empty.',
    'string.min': 'Phone number should have at least 3 characters.',
    'string.max': 'Phone number should not exceed 20 characters.',
  }),
  email: Joi.string().required().min(3).max(20).messages({
    'string.base': 'Email should be a string.',
    'string.empty': 'Email cannot be empty.',
    'string.email': 'Email must be a valid email address.',
    'string.min': 'Email should have at least 3 characters.',
    'string.max': 'Email should not exceed 20 characters.',
  }),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .default('personal')
    .messages({
      'string.base': 'Contact type should be a string.',
      'any.only': 'Contact type must be one of [work, home, personal].',
    }),
});

export const updateStudentSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name should be a string.',
    'string.empty': 'Name cannot be empty.',
    'string.min': 'Name should have at least 3 characters.',
    'string.max': 'Name should not exceed 20 characters.',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.base': 'Phone number should be a string.',
    'string.empty': 'Phone number cannot be empty.',
    'string.min': 'Phone number should have at least 3 characters.',
    'string.max': 'Phone number should not exceed 20 characters.',
  }),
  email: Joi.string().min(3).max(20).messages({
    'string.base': 'Email should be a string.',
    'string.empty': 'Email cannot be empty.',
    'string.email': 'Email must be a valid email address.',
    'string.min': 'Email should have at least 3 characters.',
    'string.max': 'Email should not exceed 20 characters.',
  }),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal')
    .messages({
      'string.base': 'Contact type should be a string.',
      'any.only': 'Contact type must be one of [work, home, personal].',
    }),
});
