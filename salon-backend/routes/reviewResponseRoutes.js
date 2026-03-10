const express = require("express");
const router = express.Router();

const controller = require("../controllers/reviewResponseController");

router.post("/create", controller.addResponse);

module.exports = router;
