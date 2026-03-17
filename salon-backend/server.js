const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const User = require("./models/User");
const Service = require("./models/Service");
const Staff = require("./models/Staff");
const Appointment = require("./models/Appointment");
const Payment = require("./models/Payment");
const ServiceAvailability = require("./models/ServiceAvailability");
const StaffAvailability = require("./models/StaffAvailability");
const Review = require("./models/Review");
const ReviewResponse = require("./models/ReviewResponse");
const reminderCron = require("./services/reminderCron");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const staffRoutes = require("./routes/staffRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const serviceAvailabilityRoutes = require("./routes/serviceAvailabilityRoutes");
const staffAvailabilityRoutes = require("./routes/staffAvailabilityRoutes");
const slotRoutes = require("./routes/slotRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const reviewResponseRoutes = require("./routes/reviewResponseRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authMiddleware = require("./middleware/authMiddleware");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/service-availability", serviceAvailabilityRoutes);
app.use("/api/staff-availability", staffAvailabilityRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/review-response", reviewResponseRoutes);
app.use("/api/admin", adminRoutes);


const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Salon Booking API Running");
});

// User ↔ Appointment
User.hasMany(Appointment, { foreignKey: "UserId" });
Appointment.belongsTo(User, { foreignKey: "UserId" });

// Service ↔ Appointment
Service.hasMany(Appointment, { foreignKey: "ServiceId" });
Appointment.belongsTo(Service, { foreignKey: "ServiceId" });

// Staff ↔ Appointment
Staff.hasMany(Appointment, { foreignKey: "StaffId" });
Appointment.belongsTo(Staff, { foreignKey: "StaffId" });

sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("DB Error:", err);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
