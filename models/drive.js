
const { Schema, model } = require("mongoose");

const driveSchema = new Schema(
  {
    shipmentDate: {
      type: Date,
      min: "2022-01-01",
      max: new Date(),
      required: [true, "Set shipmentDate"],
    },
    unloadingDate: {
      type: Date,
      min: "2022-01-01",
      max: new Date(),
      required: [true, "Set unloadingDate"],
    },
    carrier: {
      type: String,
      required: [true, "Set carrier"],
    },
    client: {
      type: String,
      required: [true, "Set client"],
    },
    // departurePoint: {
    //   type: Object,
    //   required: [true, "Set departurePoint"],
    // },
    departurePoint: {
      type: { name: String, lat: Number, lng: Number },
    },
    arrivalPoint: {
      type: { name: String, lat: Number, lng: Number },
    },
    vehicleData: {
      type: String,
      required: [true, "Set vehicleData"],
    },
    driverName: {
      type: String,
      required: [true, "Set driverName"],
    },
    driverPhone: {
      type: String,
      required: [true, "Set driverPhone"],
    },
    truckNumber: {
      type: String,
      required: [true, "Set truckNumber"],
    },
    crossingPoint: {
      type: String,
      required: [true, "Set crossingPoint"],
    },
    cmrData: {
      type: String,
      required: [true, "Set cmrData"],
    },
    cargoWeight: {
      type: String,
      required: [true, "Set cargoWeight"],
    },
    goodsDescription: {
      type: String,
      required: [true, "Set goodsDescription"],
    },
    carrierCost: {
      type: Number,
      required: [true, "Set carrierCost"],
    },
    clientCost: {
      type: Number,
      required: [true, "Set clientCost"],
    },
    clientVat: {
      type: Number,
      required: [true, "Set goodsDescription"],
    },
    clientTotalCost: {
      type: Number,
      required: [true, "Set clientTotalCost"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: false }
);

const Drive = model("drive", driveSchema);

module.exports = Drive;