const express = require("express");
const { ctrlClients } = require("../../controllers");
const { isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, ctrlClients.getClientsByQuery);

router.get("/:id", authenticate, isValidId, ctrlClients.getClientById);

router.post("/", authenticate, ctrlClients.addClient);

router.delete(
  "/:id",
  authenticate,
  isValidId,
  ctrlClients.removeClientById
);

router.put("/:id", authenticate, isValidId, ctrlClients.updateClientById);

module.exports = router;
