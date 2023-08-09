
const { Drive } = require("../models");
const { drivesJoiSchemas } = require("../schemas");
const { HttpError } = require("../utils");

const getAllDrives = async (req, res, next) => {
  try {
    const allDrives = await Drive.find().populate('owner', 'name');
    res.status(200).json(allDrives);
  } catch (error) {
    next(error);
  }
};

const getDriveById = async (req, res, next) => {
  try {
    const { driveId } = req.params;
    const driveById = await Drive.findById(driveId);
    if (!driveId) throw HttpError(404, "Not Found");

    res.status(200).json(driveById);
  } catch (error) {
    next(error);
  }
};

const addDrive = async (req, res, next) => {
    try {
      const { _id } = req.user;
    //   const { name, email, phone } = req.body;
      const { error } = drivesJoiSchemas.addDriveSchema.validate(req.body);
      if (error) throw HttpError(400, "missing required name field");

      const addedDrive = await Drive.create({ ...req.body, owner: _id });
      res.status(201).json(addedDrive);
  } catch (error) {
    next(error);
  }
};

const removeDriveById = async (req, res, next) => {
    try {
      const { driveId } = req.params;
      const removedDrive = await Drive.findByIdAndDelete(driveId);
      if (!removedDrive) throw HttpError(404, "Not found");

      res.status(200).json({ message: "drive deleted" });
  } catch (error) {
    next(error);
  }
};

const updateDriveById = async (req, res, next) => {
    try {
    //   const { name, email, phone } = req.body;
      const { error } = drivesJoiSchemas.addDriveSchema.validate(req.body);
      if (error) throw HttpError(400, "missing fields");

      const { driveId } = req.params;
      const updatedDrive = await Drive.findByIdAndUpdate(driveId, req.body, {
        new: true,
      });
      if (!updatedDrive) throw HttpError(404, "Not found");

      res.status(200).json(updatedDrive);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllDrives,
  getDriveById,
  addDrive,
  removeDriveById,
  updateDriveById,
};