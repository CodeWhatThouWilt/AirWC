'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 2,
        review: 'Awesome host and very clean spot!',
        rating: 5
      },
      {
        spotId: 1,
        userId: 3,
        review: 'Super clean, was able to be in and out in a jiffy!',
        rating: 5
      },
      {
        spotId: 1,
        userId: 2,
        review: 'Awesome host and very clean spot!',
        rating: 5
      },
      {
        spotId: 1,
        userId: 2,
        review: 'Awesome host and very clean spot!',
        rating: 5
      },
      {
        spotId: 1,
        userId: 2,
        review: 'Awesome host and very clean spot!',
        rating: 5
      },
      {
        spotId: 1,
        userId: 2,
        review: 'Awesome host and very clean spot!',
        rating: 5
      },
    ], {});
  },


  spotId: DataTypes.INTEGER,
  userId: DataTypes.INTEGER,
  review: DataTypes.STRING,
  rating: DataTypes.INTEGER

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
