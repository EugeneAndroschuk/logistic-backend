const Joi = require("joi");

const addDriveSchema = Joi.object({
  shipmentDate: Joi.date().greater("1-1-2022").max(new Date()).required(),
  unloadingDate: Joi.date()
    .greater("1-1-2022")
    .max(new Date())
    .required(),
  carrier: Joi.string().required(),
  client: Joi.string().required(),
  departurePoint: Joi.string().required(),
  arrivalPoint: Joi.string().required(),
  vehicleData: Joi.string().required(),
});

module.exports = {
  addDriveSchema,
};
