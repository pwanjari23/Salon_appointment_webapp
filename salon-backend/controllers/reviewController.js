const Review = require("../models/Review");

exports.createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);

    res.status(201).json({
      message: "Review added successfully",
      data: review,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getServiceReviews = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const reviews = await Review.findAll({
      where: { ServiceId: serviceId },
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
