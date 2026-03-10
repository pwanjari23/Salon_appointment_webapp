const StaffAvailability = require("../models/StaffAvailability");

exports.createAvailability = async (req, res) => {
  try {
    const availability = await StaffAvailability.create(req.body);

    res.status(201).json({
      message: "Staff availability added",
      data: availability,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
