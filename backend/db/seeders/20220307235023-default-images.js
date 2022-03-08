'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      {
        spotId: 1,
        url: 'https://www.impressiveinteriordesign.com/wp-content/uploads/2014/11/Bathroom-Interior-Design-Photo-Gallery-With-Gorgeous-Examples-1.jpg'
      },
      {
        spotId: 2,
        url: 'https://www.impressiveinteriordesign.com/wp-content/uploads/2014/11/Bathroom-Interior-Design-Photo-Gallery-With-Gorgeous-Examples-2.jpg'
      },
      {
        spotId: 3,
        url: 'https://www.impressiveinteriordesign.com/wp-content/uploads/2014/11/Bathroom-Interior-Design-Photo-Gallery-With-Gorgeous-Examples-4.jpg'
      },
      {
        spotId: 4,
        url: 'https://www.impressiveinteriordesign.com/wp-content/uploads/2014/11/Bathroom-Interior-Design-Photo-Gallery-With-Gorgeous-Examples-5.jpg'
      },
      {
        spotId: 5,
        url: 'https://www.impressiveinteriordesign.com/wp-content/uploads/2014/11/Bathroom-Interior-Design-Photo-Gallery-With-Gorgeous-Examples-6.jpg'
      },
      {
        spotId: 6,
        url: 'https://www.impressiveinteriordesign.com/wp-content/uploads/2014/11/Bathroom-Interior-Design-Photo-Gallery-With-Gorgeous-Examples-7.jpg'
      },
      {
        spotId: 7,
        url: 'https://www.impressiveinteriordesign.com/wp-content/uploads/2014/11/Bathroom-Interior-Design-Photo-Gallery-With-Gorgeous-Examples-8.jpg'
      },
      {
        spotId: 8,
        url: 'https://www.impressiveinteriordesign.com/wp-content/uploads/2014/11/Bathroom-Interior-Design-Photo-Gallery-With-Gorgeous-Examples-10.jpg'
      },
      {
        spotId: 9,
        url: 'https://www.impressiveinteriordesign.com/wp-content/uploads/2014/11/Bathroom-Interior-Design-Photo-Gallery-With-Gorgeous-Examples-11.jpg'
      },
      {
        spotId: 10,
        url: 'https://www.impressiveinteriordesign.com/wp-content/uploads/2014/11/Bathroom-Interior-Design-Photo-Gallery-With-Gorgeous-Examples-12.jpg'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});
  }
};
