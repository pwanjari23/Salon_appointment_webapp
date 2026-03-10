const express = require("express");
const router = express.Router();
const controller = require("../controllers/slotController");

router.get("/available-slots", controller.getAvailableSlots);

module.exports = router;
