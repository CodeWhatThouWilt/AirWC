'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    review: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    cleanliness: DataTypes.INTEGER,
    communication: DataTypes.INTEGER,
    checkin: DataTypes.INTEGER,
    accuracy: DataTypes.INTEGER,
    location: DataTypes.INTEGER,
    value: DataTypes.INTEGER,
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.Spot, { foreignKey: 'spotId' });
    Review.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Review;
};