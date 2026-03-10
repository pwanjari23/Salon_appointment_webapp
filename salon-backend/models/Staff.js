const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Staff = sequelize.define("Staff", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },

  specialization: {
    type: DataTypes.STRING
  }

});

module.exports = Staff;