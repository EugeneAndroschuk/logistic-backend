const Joi = require("joi");

const addDriveSchema = Joi.object({
  shipmentDate: Joi.date().min("1-1-2022").max(new Date()).required(),
  unloadingDate: Joi.date().min("1-1-2022").max(new Date()).required(),
  carrier: Joi.string().required(),
  client: Joi.string().required(),
  departurePoint: Joi.object().required(),
  arrivalPoint: Joi.string().required(),
  vehicleData: Joi.string().required(),
  driverName: Joi.string().required(),
  driverPhone: Joi.string().required(),
  truckNumber: Joi.string().required(),
  crossingPoint: Joi.string().required(),
  cmrData: Joi.string().required(),
  cargoWeight: Joi.string().required(),
  goodsDescription: Joi.string().required(),
  carrierCost: Joi.number().required(),
  clientCost: Joi.number().required(),
  clientVat: Joi.number().required(),
  clientTotalCost: Joi.number().required(),
});

module.exports = {
  addDriveSchema,
};
