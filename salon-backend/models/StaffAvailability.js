const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Staff = require("./Staff");

const StaffAvailability = sequelize.define("StaffAvailability", {
  day_of_week: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
});

Staff.hasMany(StaffAvailability);
StaffAvailability.belongsTo(Staff);

module.exports = StaffAvailability;
