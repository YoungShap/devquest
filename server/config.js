const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,30}$/)
        .message('user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, 4 numbers and one of the following characters !@#$%^&*'),
});

const signupSchema = Joi.object({
    firstName: Joi.string().min(3).max(10).required(),
    lastName: Joi.string().min(3).max(10).required(),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,30}$/)
      .message('user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, 4 numbers and one of the following characters !@#$%^&*'),
      devName: Joi.string().min(3).required()
  });

  const ProjectSchema = Joi.object({
    name: Joi.string().min(3).max(18).required(),
    category: Joi.string().required(),
    dev: Joi.string().min(3).max(16).required(),
    ghub: Joi.string().max(500).required(),
});

const editAccSchema = Joi.object({
    firstName: Joi.string().min(3).max(10).required(),
    lastName: Joi.string().min(3).max(10).required(),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    devName: Joi.string().min(3).max(10).required(),
  });

module.exports = {
    loginSchema,
    signupSchema,
    ProjectSchema,
    editAccSchema,
};