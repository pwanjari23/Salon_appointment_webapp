const Appointment = require("../models/Appointment");
const User = require("../models/User");
const sendEmail = require("../services/emailService");
const Service = require("../models/Service");
const Staff = require("../models/Staff");

exports.bookAppointment = async (req, res) => {
  try {
    const { serviceId, staffId, date, time } = req.body;

    const existingAppointment = await Appointment.findOne({
      where: {
        staffId,
        date,
        time,
        status: "booked",
      },
    });

    if (existingAppointment) {
      return res.status(400).json({
        message: "This time slot is already booked",
      });
    }

    const appointment = await Appointment.create({
      userId: req.user.id,
      serviceId,
      staffId,
      date,
      time,
    });

    const service = await Service.findByPk(serviceId);
    const staff = await Staff.findByPk(staffId);
    const user = await User.findByPk(req.user.id);

    await sendEmail(
      user.email,
      "Appointment Confirmed",
      `Hello ${user.name},

       Your appointment has been successfully booked.

       Service: ${service.name}
       Staff: ${staff.name}
       Date: ${date}
       Time: ${time}

       Thank you for choosing our salon!`,
    );

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { userId: req.user.id },
    });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    appointment.status = "cancelled";

    await appointment.save();

    res.json({
      message: "Appointment cancelled",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

exports.getAvailableSlots = async (req, res) => {
  try {
    const { staffId, date } = req.query;

    const allSlots = [
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
      "12:30 PM",
      "1:00 PM",
      "1:30 PM",
      "2:00 PM",
      "2:30 PM",
      "3:00 PM",
      "3:30 PM",
      "4:00 PM",
      "4:30 PM",
      "5:00 PM",
    ];

    const bookedSlots = await Appointment.findAll({
      where: {
        staffId,
        date,
        status: "booked",
      },
    });

    const bookedTimes = bookedSlots.map((a) => a.time);

    const availableSlots = allSlots.filter(
      (slot) => !bookedTimes.includes(slot),
    );

    res.json({
      availableSlots,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};
