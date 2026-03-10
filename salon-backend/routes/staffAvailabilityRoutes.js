const express = require("express");
const router = express.Router();
const controller = require("../controllers/staffAvailabilityController");

router.post("/create", controller.createAvailability);

module.exports = router;
