'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    userId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    shortDescription: DataTypes.STRING,
    longDescription: DataTypes.STRING,
    selfCheckIn: DataTypes.BOOLEAN,
  }, {});
  Spot.associate = function(models) {
    // associations can be defined here
    Spot.belongsTo(models.User, { foreignKey: 'userId' });
    Spot.hasMany(models.Image, { foreignKey: 'spotId', onDelete: 'cascade', hooks: true});
    Spot.hasMany(models.Booking, { foreignKey: 'spotId', onDelete: 'cascade', hooks: true});
    Spot.hasMany(models.Review, { foreignKey: 'spotId', onDelete: 'cascade', hooks: true});
    Spot.hasMany(models.Favorite, { foreignKey: 'spotId', onDelete: 'cascade', hooks: true });
  };
  return Spot;
};
