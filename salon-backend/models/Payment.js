const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Payment = sequelize.define("Payment", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  appointmentId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  orderId: {
    type: DataTypes.STRING
  },

  status: {
    type: DataTypes.ENUM("pending", "paid", "failed"),
    defaultValue: "pending"
  }

});

module.exports = Payment;