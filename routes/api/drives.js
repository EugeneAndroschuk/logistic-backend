const express = require("express");
const { ctrlDrives } = require("../../controllers");
const { isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, ctrlDrives.getAllDrives);

router.get("/:driveId", authenticate, isValidId, ctrlDrives.getDriveById);

router.post("/", authenticate, ctrlDrives.addDrive);

router.delete("/:driveId", authenticate, isValidId, ctrlDrives.removeDriveById);

router.put("/:driveId", authenticate, isValidId, ctrlDrives.updateDriveById);

module.exports = router;
