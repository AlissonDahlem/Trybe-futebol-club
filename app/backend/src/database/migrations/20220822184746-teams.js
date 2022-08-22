'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teams', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      team_name: Sequelize.STRING,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('teams');
  }
};
