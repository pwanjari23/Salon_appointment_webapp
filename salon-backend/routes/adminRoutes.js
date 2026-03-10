const express = require("express");
const router = express.Router();
const controller = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/users", authMiddleware, adminMiddleware, controller.getAllUsers);

router.get(
  "/appointments",
  authMiddleware,
  adminMiddleware,
  controller.getAllAppointments,
);

router.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  controller.deleteUser,
);

module.exports = router;
