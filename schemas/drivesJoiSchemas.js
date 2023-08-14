const Joi = require("joi").extend(require("@joi/date"));;

const addDriveSchema = Joi.object({
  shipmentDate: Joi.date()
    .utc()
    .format("DD-MM-YYYY")
    .min("1-1-2022")
    .max(new Date())
    .required(),
  unloadingDate: Joi.date().utc()
    .format("DD-MM-YYYY")
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
