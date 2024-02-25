'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('StarsPlanets', {
      starId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Stars",
          key: "id",
        }

      },
      planetId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Planets",
          key: "id",
        }
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('StarsPlanets');
  }
};
