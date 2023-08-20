const Joi = require("joi");

const addClientSchema = Joi.object({
  code: Joi.string().required(),
  name: Joi.string().required(),
  comments: Joi.string(),
});

module.exports = {
  addClientSchema,
};
