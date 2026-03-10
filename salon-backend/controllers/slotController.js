const StaffAvailability = require("../models/StaffAvailability");
const Appointment = require("../models/Appointment");
const Service = require("../models/Service");

exports.getAvailableSlots = async (req, res) => {
  try {
    const { staffId, serviceId, date } = req.query;

    const service = await Service.findByPk(serviceId);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const duration = service.duration;

    const dayOfWeek = new Date(date).toLocaleString("en-us", {
      weekday: "long",
    });

    const availability = await StaffAvailability.findOne({
      where: {
        StaffId: staffId,
        day_of_week: dayOfWeek,
      },
    });

    if (!availability) {
      return res.json({ slots: [] });
    }

    const start = availability.start_time;
    const end = availability.end_time;

    const slots = [];

    let current = new Date(`1970-01-01T${start}`);
    const endTime = new Date(`1970-01-01T${end}`);

    while (current < endTime) {
      slots.push(current.toTimeString().slice(0, 5));

      current = new Date(current.getTime() + duration * 60000);
    }

    const appointments = await Appointment.findAll({
      where: {
        staffId,
        date,
      },
    });

    const bookedSlots = appointments.map((a) => a.time);

    const availableSlots = slots.filter((slot) => !bookedSlots.includes(slot));

    res.json({
      availableSlots,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
