'use strict';

const {USER_TABLE} = require('../models/user.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(USER_TABLE, 'recoveryToken',{
      field: 'recovery_token',
      allowNull: true,
      type: Sequelize.DataTypes.STRING
    })
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(USER_TABLE, 'recovery_token');
  }
};

/*
$ npm run migrations:generate recovery-token
$ npm run migrations:run
*/