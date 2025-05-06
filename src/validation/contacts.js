import Joi from 'joi';

import { contactTypeList } from '../constants/contacts-constants.js';

export const contactCreateSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phoneNumber: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(30),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...contactTypeList),
});

export const contactUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    phoneNumber: Joi.string().min(3).max(30),
    email: Joi.string().min(3).max(30),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...contactTypeList),
});