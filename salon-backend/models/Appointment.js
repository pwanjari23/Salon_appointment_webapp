const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Appointment = sequelize.define("Appointment", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  serviceId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  staffId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },

  time: {
    type: DataTypes.STRING,
    allowNull: false
  },

  status: {
    type: DataTypes.ENUM("booked", "cancelled", "completed"),
    defaultValue: "booked"
  }

});

module.exports = Appointment;