const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Service = require("./Service");

const ServiceAvailability = sequelize.define("ServiceAvailability", {
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

Service.hasMany(ServiceAvailability);
ServiceAvailability.belongsTo(Service);

module.exports = ServiceAvailability;
