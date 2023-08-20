const express = require("express");
const { ctrlDrives } = require("../../controllers");
const { isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, ctrlDrives.getDrivesByQuery);

router.get("/:id", authenticate, isValidId, ctrlDrives.getDriveById);

router.post("/", authenticate, ctrlDrives.addDrive);

router.delete("/:id", authenticate, isValidId, ctrlDrives.removeDriveById);

router.put("/:id", authenticate, isValidId, ctrlDrives.updateDriveById);

module.exports = router;
