const Staff = require("../models/Staff");

exports.createStaff = async (req, res) => {
  try {
    const { name, email, phone, specialization } = req.body;

    const staff = await Staff.create({
      name,
      email,
      phone,
      specialization,
    });

    res.status(201).json({
      message: "Staff created successfully",
      staff,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

exports.getStaff = async (req, res) => {
  try {
    const staff = await Staff.findAll();

    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

exports.updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.params.id);

    if (!staff) {
      return res.status(404).json({
        message: "Staff not found",
      });
    }

    await staff.update(req.body);

    res.json({
      message: "Staff updated",
      staff,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

exports.deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.params.id);

    if (!staff) {
      return res.status(404).json({
        message: "Staff not found",
      });
    }

    await staff.destroy();

    res.json({
      message: "Staff deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};
