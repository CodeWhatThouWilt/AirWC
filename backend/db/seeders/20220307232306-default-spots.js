'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Spots', [
      {
        userId: 2,
        address: '2 app academy ln',
        city: 'Full stack city',
        state: 'Solid',
        country: 'United States of America',
        name: 'Post 2',
        price: 20
      },
      {
        userId: 3,
        address: '3 app academy ln',
        city: 'Full stack city',
        state: 'Solid',
        country: 'United States of America',
        name: 'Post 3',
        price: 20
      },
      {
        userId: 4,
        address: '4 app academy ln',
        city: 'Full stack city',
        state: 'Solid',
        country: 'United States of America',
        name: 'Post 4',
        price: 20
      },
      {
        userId: 5,
        address: '5 app academy ln',
        city: 'Full stack city',
        state: 'Solid',
        country: 'United States of America',
        name: 'Post 5',
        price: 20
      },
      {
        userId: 6,
        address: '6 app academy ln',
        city: 'Full stack city',
        state: 'Solid',
        country: 'United States of America',
        name: 'Post 6',
        price: 20
      },
      {
        userId: 7,
        address: '7 app academy ln',
        city: 'Full stack city',
        state: 'Solid',
        country: 'United States of America',
        name: 'Post 7',
        price: 20
      },
      {
        userId: 8,
        address: '8 app academy ln',
        city: 'Full stack city',
        state: 'Solid',
        country: 'United States of America',
        name: 'Post 8',
        price: 20
      },
      {
        userId: 9,
        address: '9 app academy ln',
        city: 'Full stack city',
        state: 'Solid',
        country: 'United States of America',
        name: 'Post 9',
        price: 20
      },
      {
        userId: 10,
        address: '10 app academy ln',
        city: 'Full stack city',
        state: 'Solid',
        country: 'United States of America',
        name: 'Post 10',
        price: 20
      },
      {
        userId: 11,
        address: '11 app academy ln',
        city: 'Full stack city',
        state: 'Solid',
        country: 'United States of America',
        name: 'Post 11',
        price: 20
      },
      {
        userId: 1,
        address: '1 app academy ln',
        city: 'Full stack city',
        state: 'Solid',
        country: 'United States of America',
        name: 'Post 1',
        price: 20
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Spots', null, {});
  }
};
