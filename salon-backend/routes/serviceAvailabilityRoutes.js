const express = require("express");
const router = express.Router();
const controller = require("../controllers/serviceAvailabilityController");

router.post("/create", controller.createAvailability);

module.exports = router;
