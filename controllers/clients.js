const { Client } = require("../models");
const { clientsJoiSchemas } = require("../schemas");
const { HttpError } = require("../utils");

const getClientsByQuery = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    const skip = (page - 1) * limit;

    const filterOptions = {};

    const allClients = await Client.find(filterOptions, "", {
      skip,
      limit,
    })
      .populate("owner", "name")
      .sort({ name: 1 });

    const total = await Client.countDocuments(filterOptions);

    res.status(200).json({ allClients, total });
  } catch (error) {
    next(error);
  }
};

const getClientById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const clientById = await Client.findById(id);
    if (!clientById) throw HttpError(404, "Not Found");

    res.status(200).json(clientById);
  } catch (error) {
    next(error);
  }
};

const addClient = async (req, res, next) => {
  try {
    const { _id } = req.user;

    // const { shipmentDate, unloadingDate } = req.body;

    const { error } = clientsJoiSchemas.addClientSchema.validate(req.body);
    if (error) throw HttpError(400, "missing required name field");

    await Client.create({ ...req.body, owner: _id });

    // res.status(201).json(addedDrive);
    res.status(201).json({ message: "Add sucsessful" });
  } catch (error) {
    next(error);
  }
};

const removeClientById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedClient = await Client.findByIdAndDelete(id);
    if (!removedClient) throw HttpError(404, "Not found");

    // res.status(200).json(removedDrive);
    res.status(200).json({ message: "Remove sucsessful" });
  } catch (error) {
    next(error);
  }
};

const updateClientById = async (req, res, next) => {
  try {
    //   const { name, email, phone } = req.body;
    const { error } = clientsJoiSchemas.addClientSchema.validate(req.body);
    if (error) throw HttpError(400, "missing fields");

    const { id } = req.params;
    const updatedClient = await Client.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedClient) throw HttpError(404, "Not found");

    // res.status(200).json(updatedDrive);
    res.status(200).json({ message: "Udate sucsessful!" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getClientsByQuery,
  getClientById,
  addClient,
  removeClientById,
  updateClientById,
};
