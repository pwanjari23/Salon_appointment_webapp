const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = require("./User");
const Service = require("./Service");

const Review = sequelize.define("Review", {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

User.hasMany(Review);
Review.belongsTo(User);

Service.hasMany(Review);
Review.belongsTo(Service);

module.exports = Review;
