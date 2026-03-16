const express = require("express");
const router = express.Router();

const appointmentController = require("../controllers/appointmentController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, appointmentController.bookAppointment);
router.get("/", authMiddleware, appointmentController.getAppointments);
router.put(
  "/cancel/:id",
  authMiddleware,
  appointmentController.cancelAppointment,
);

router.put(
  "/confirm/:id",
  authMiddleware,
  appointmentController.confirmAppointment,
);
router.get("/available-slots", appointmentController.getAvailableSlots);

module.exports = router;
