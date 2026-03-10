const ReviewResponse = require("../models/ReviewResponse");

exports.addResponse = async (req, res) => {
  try {
    const response = await ReviewResponse.create(req.body);

    res.status(201).json({
      message: "Response added successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
