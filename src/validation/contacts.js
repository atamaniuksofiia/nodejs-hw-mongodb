import Joi from 'joi';

export const createContactsSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .required()
    .regex(/^[a-zA-Zа-яА-ЯіІєЄїЇґҐ\s'-]+$/)
    .messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 100 characters',
      'string.pattern.base':
        'Name can only contain letters, spaces, hyphens, and apostrophes',
      'any.required': 'Name is required',
    }),
  phoneNumber: Joi.string()
    .pattern(/^[+]?\d{10,15}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Phone number must be a valid format (10-15 digits, optional + at start)',
      'any.required': 'Phone number is required',
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required',
    }),

  contactType: Joi.string()
    .valid('home', 'personal', 'work')
    .required()
    .messages({
      'any.only': 'Contact type must be one of: home, personal, work',
      'any.required': 'Contact type is required',
    }),
  isFavourite: Joi.boolean().optional().default(false).messages({
    'boolean.base': 'isFavourite must be a boolean',
  }),
});
