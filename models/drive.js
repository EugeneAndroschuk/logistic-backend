
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
    departurePoint: {
      type: String,
      required: [true, "Set departurePoint"],
    },
    arrivalPoint: {
      type: String,
      required: [true, "Set arrivalPoint"],
    },
    vehicleData: {
      type: String,
      required: [true, "Set vehicleData"],
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