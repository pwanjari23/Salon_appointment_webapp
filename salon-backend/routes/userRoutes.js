const express = require("express");
const router = express.Router();

// Controllers
const { getProfile, updateProfile } = require("../controllers/userController");
const { getMyAppointments } = require("../controllers/appointmentController");

// Middleware
const authMiddleware = require("../middleware/authMiddleware");

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.get("/appointments/my", authMiddleware, getMyAppointments);

module.exports = router;