const axios = require("axios");
const { Drive } = require("../models");
const { drivesJoiSchemas } = require("../schemas");
const { HttpError } = require("../utils");
require("dotenv").config();

const { LARDI_TRANS_KEY } = process.env;

// const getAllDrives = async (req, res, next) => {
//   try {
//     const allDrives = await Drive.find().populate("owner", "name");
//     res.status(200).json(allDrives);
//   } catch (error) {
//     next(error);
//   }
// };

const getDrivesByQuery = async (req, res, next) => {
  try {
    const { dateFrom, dateTill, userId, page, limit } = req.query;

    const skip = (page - 1) * limit;

    const idFilter = userId ? { owner: userId } : {};

    const dateFilter = dateFrom
      ? {
          shipmentDate: { $gte: new Date(dateFrom).toISOString() },
          unloadingDate: { $lte: new Date(dateTill).toISOString() },
        }
      : {};

    const filterOptions = { ...dateFilter, ...idFilter };

    const allDrives = await Drive.find(filterOptions, "", {
      skip,
      limit,
    })
      .populate("owner", "name")
      .sort({ shipmentDate: 1 });

    const total = await Drive.countDocuments(filterOptions);

    res.status(200).json({ total, allDrives });
  } catch (error) {
    next(error);
  }
};

const getDriveById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const driveById = await Drive.findById(id);
    if (!id) throw HttpError(404, "Not Found");

    res.status(200).json([driveById]);
  } catch (error) {
    next(error);
  }
};

const addDrive = async (req, res, next) => {
  try {
    const { _id } = req.user;

    // const { shipmentDate, unloadingDate } = req.body;

    const { error } = drivesJoiSchemas.addDriveSchema.validate(req.body);
    if (error) throw HttpError(400, "missing required name field");

    await Drive.create({ ...req.body, owner: _id });

    // res.status(201).json(addedDrive);
    res.status(201).json({ message: "Add sucsessful" });
  } catch (error) {
    next(error);
  }
};

const removeDriveById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedDrive = await Drive.findByIdAndDelete(id);
    if (!removedDrive) throw HttpError(404, "Not found");

    // res.status(200).json(removedDrive);
    res.status(200).json({ message: "Remove sucsessful" });
  } catch (error) {
    next(error);
  }
};

const updateDriveById = async (req, res, next) => {
  try {
    //   const { name, email, phone } = req.body;
    const { error } = drivesJoiSchemas.addDriveSchema.validate(req.body);
    if (error) throw HttpError(400, "missing fields");

    const { id } = req.params;
    const updatedDrive = await Drive.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedDrive) throw HttpError(404, "Not found");

    // res.status(200).json(updatedDrive);
    res.status(200).json({ message: "Udate sucsessful!" });
  } catch (error) {
    next(error);
  }
};

const getCity = async (req, res, next) => {
  try {
    const { city } = req.query;
    const response = await axios.get(
      `https://api.lardi-trans.com/v2/references/towns/by/name?language=uk&query=${city}&limit=10`,
      {
        headers: {
          Authorization: LARDI_TRANS_KEY,
          Accept: "application/json",
        },
      }
    );

    if(response.data) res.status(200).json(response.data);

  } catch (error) {
    if(error.code === 'ETIMEDOUT') res.status(200).json([]); else next(error);
  }
};

module.exports = {
  getDrivesByQuery,
  getDriveById,
  addDrive,
  removeDriveById,
  updateDriveById,
  getCity,
};
