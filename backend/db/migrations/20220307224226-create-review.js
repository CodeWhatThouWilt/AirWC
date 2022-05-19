'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Spots" }
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users" }
      },
      review: {
        allowNull: false,
        type: Sequelize.STRING(2000)
      },
      cleanliness: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      communication: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      checkin: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      accuracy: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      location: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      value: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Reviews');
  }
};