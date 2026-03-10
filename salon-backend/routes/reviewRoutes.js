const express = require("express");
const router = express.Router();

const controller = require("../controllers/reviewController");

router.post("/create", controller.createReview);
router.get("/service/:serviceId", controller.getServiceReviews);

module.exports = router;
