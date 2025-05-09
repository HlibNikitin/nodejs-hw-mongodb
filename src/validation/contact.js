import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name is too short',
    'string.max': 'Name is too long',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Phone must be a string',
    'string.min': 'Phone is too short',
    'string.max': 'Phone is too long',
    'any.required': 'Phone is required',
  }),
  email: Joi.string().min(3).max(20).messages({
    'string.base': 'Email must be a string',
    'string.min': 'Email is too short',
    'string.max': 'Email is too long',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.base': 'Type must be a string',
      'string.min': 'Type is too short',
      'string.max': 'Type is too long',
      'any.only': 'Type must be work, home, or personal',
      'any.required': 'Type is required',
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name is too short',
    'string.max': 'Name is too long',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.base': 'Phone must be a string',
    'string.min': 'Phone is too short',
    'string.max': 'Phone is too long',
  }),
  email: Joi.string().min(3).max(20).messages({
    'string.base': 'Email must be a string',
    'string.min': 'Email is too short',
    'string.max': 'Email is too long',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid('work', 'home', 'personal')
    .messages({
      'string.base': 'Type must be a string',
      'string.min': 'Type is too short',
      'string.max': 'Type is too long',
    }),
});
