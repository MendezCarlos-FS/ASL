'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Galaxies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.changeColumn("Stars", "galaxyId", {
      type: Sequelize.INTEGER,
      references: { model: "Galaxies", key: "id" }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Stars", "galaxyId", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.dropTable('Galaxies');
  }
};