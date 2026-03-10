const cron = require("node-cron");
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const sendEmail = require("./emailService");

cron.schedule("0 * * * *", async () => {
  console.log("Running appointment reminder job...");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dateString = tomorrow.toISOString().split("T")[0];

  const appointments = await Appointment.findAll({
    where: {
      date: dateString,
      status: "booked",
    },
  });

  for (let appointment of appointments) {
    const user = await User.findByPk(appointment.userId);

    await sendEmail(
      user.email,
      "Appointment Reminder",
      `Hello ${user.name},

       Reminder: You have an appointment tomorrow.

       Date: ${appointment.date}
       Time: ${appointment.time}

       See you soon!`,
    );
  }
});
