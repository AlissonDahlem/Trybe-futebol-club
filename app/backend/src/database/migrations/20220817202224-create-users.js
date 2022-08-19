'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: Sequelize.STRING,
      role: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING
      })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
