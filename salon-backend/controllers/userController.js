const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    res.status(200).json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

// exports.getMyAppointments = async (req, res) => {
//   try {
//     const appointments = await Appointment.findAll({
//       where: {
//         userId: req.user.id, // ✅ FILTER BY USER
//       },
//       include: [
//         {
//           model: User,
//           attributes: ["id", "name", "email"],
//         },
//         {
//           model: Service,
//           attributes: ["id", "name"],
//         },
//         {
//           model: Staff,
//           attributes: ["id", "name"],
//         },
//       ],
//       order: [["date", "DESC"]],
//     });

//     res.json(appointments);
//   } catch (error) {
//     res.status(500).json({
//       message: "Server error",
//       error,
//     });
//   }
// };
