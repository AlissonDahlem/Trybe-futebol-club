'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teams', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      teamName: {
       type: Sequelize.STRING,
       field: 'team_name',
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('teams');
  }
};
