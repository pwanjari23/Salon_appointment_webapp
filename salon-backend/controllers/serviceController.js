const Service = require("../models/Service");

exports.createService = async (req, res) => {
  try {
    const { name, description, duration, price } = req.body;

    const service = await Service.create({
      name,
      description,
      duration,
      price,
    });

    res.status(201).json({
      message: "Service created",
      service,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

exports.getServices = async (req, res) => {
  try {
    const services = await Service.findAll();

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    await service.update(req.body);

    res.json({
      message: "Service updated",
      service,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    await service.destroy();

    res.json({
      message: "Service deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};
