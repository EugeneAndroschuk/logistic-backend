const Joi = require("joi");

// .format("DD-MM-YYYY").utc()
const addDriveSchema = Joi.object({
  shipmentDate: Joi.date()
    .min("1-1-2022")
    .max(new Date())
    .required(),
  unloadingDate: Joi.date()
    .min("1-1-2022")
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
