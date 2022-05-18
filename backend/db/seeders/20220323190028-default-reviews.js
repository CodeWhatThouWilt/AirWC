'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 2,
        review: 'Awesome host and very clean spot!',
        cleanliness: 4,
        communication: 3,
        checkin: 5,
        accuracy: 4,
        location: 3,
        value: 4,
      },
      {
        spotId: 1,
        userId: 3,
        review: 'Super clean, was able to be in and out in a jiffy!',
        cleanliness: 2,
        communication: 3,
        checkin: 3,
        accuracy: 5,
        location: 5,
        value: 3,
      },
      {
        spotId: 1,
        userId: 2,
        review: 'Awesome host and very clean spot!',
        cleanliness: 5,
        communication: 2,
        checkin: 4,
        accuracy: 3,
        location: 1,
        value: 5,
      },
      {
        spotId: 1,
        userId: 2,
        review: 'Awesome host and very clean spot!',
        cleanliness: 5,
        communication: 5,
        checkin: 4,
        accuracy: 2,
        location: 5,
        value: 5,
      },
      {
        spotId: 1,
        userId: 2,
        review: 'Awesome host and very clean spot!',
        cleanliness: 4,
        communication: 3,
        checkin: 5,
        accuracy: 4,
        location: 3,
        value: 4,
      },
      {
        spotId: 1,
        userId: 2,
        review: 'Awesome host and very clean spot!',
        cleanliness: 2,
        communication: 5,
        checkin: 3,
        accuracy: 2,
        location: 4,
        value: 1,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
