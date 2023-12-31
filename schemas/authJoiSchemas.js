const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string()
    .valid(...["accountant", "manager", "admin"])
    .required(),
  token: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};