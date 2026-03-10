const ServiceAvailability = require("../models/ServiceAvailability");

exports.createAvailability = async (req, res) => {
  try {
    const availability = await ServiceAvailability.create(req.body);

    res.status(201).json({
      message: "Availability added",
      data: availability,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
