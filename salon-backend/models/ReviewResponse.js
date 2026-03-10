const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Review = require("./Review");
const Staff = require("./Staff");

const ReviewResponse = sequelize.define("ReviewResponse", {
  response: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Review.hasOne(ReviewResponse);
ReviewResponse.belongsTo(Review);

Staff.hasMany(ReviewResponse);
ReviewResponse.belongsTo(Staff);

module.exports = ReviewResponse;
