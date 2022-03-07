'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'user1@default.com',
        firstName: 'Demo',
        lastName: 'User',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user2@default.com',
        firstName: 'Ali',
        lastName: 'Naqvi',
        hashedPassword: bcrypt.hashSync('fsdkljsadclkdsasdaki')
      },
      {
        email: 'user3@default.com',
        firstName: 'Anabel',
        lastName: 'Villalobos',
        hashedPassword: bcrypt.hashSync('dsfdfawefefewf')
      },
      {
        email: 'user4@default.com',
        firstName: 'Angel',
        lastName: 'Wei',
        hashedPassword: bcrypt.hashSync('sdfrvdrgrffesfe')
      },
      {
        email: 'user5@default.com',
        firstName: 'Braxton',
        lastName: 'Kappes',
        hashedPassword: bcrypt.hashSync('sdeaeddedwqd')
      },
      {
        email: 'user6@default.com',
        firstName: 'Yake',
        lastName: 'North',
        hashedPassword: bcrypt.hashSync('safefwefaesesfes')
      },
      {
        email: 'user7@default.com',
        firstName: 'Jason',
        lastName: 'Li',
        hashedPassword: bcrypt.hashSync('dssrfasedaefew')
      },
      {
        email: 'user8@default.com',
        firstName: 'Madi',
        lastName: 'Lippmann',
        hashedPassword: bcrypt.hashSync('ythtgrgtdfhtrhrtdh')
      },
      {
        email: 'user9@default.com',
        firstName: 'Phillip',
        lastName: 'Roberts',
        hashedPassword: bcrypt.hashSync('sfsfrevrtvr')
      },
      {
        email: 'user10@default.com',
        firstName: 'Steven',
        lastName: 'Kleinberg',
        hashedPassword: bcrypt.hashSync('thtbdssasaefdrg')
      },
      {
        email: 'user11@default.com',
        firstName: 'Will',
        lastName: 'Kee',
        hashedPassword: bcrypt.hashSync('hyhtdgdsgsg')
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      email: { [Op.in]: ['user1@default.com', 'user1@user.io', 'user2@user.io'] }
    }, {});
  }
};