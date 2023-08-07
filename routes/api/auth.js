const express = require("express");
const { ctrlAuth } = require('../../controllers');
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.post("/register", ctrlAuth.registerUser);

router.post("/login", ctrlAuth.loginUser);

router.post("/logout", authenticate, ctrlAuth.logoutUser);

router.get("/current", authenticate, ctrlAuth.getCurrentUser);


module.exports = router;