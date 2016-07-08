'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },      
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password_salt: {
        type: Sequelize.STRING,
        allowNull: false
      },
      is_enabled: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      is_subscribed: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      created: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(function(){
      queryInterface.addIndex(
        'users',
        ['username'],
        {indicesType: 'UNIQUE'}
      ).then(function(){
        queryInterface.addIndex(
          'users',
          ['email'],
          {indicesType: 'UNIQUE'}
        ).then(function(){
          return queryInterface.addIndex(
            'users',
            ['uuid'],
            {indicesType: 'UNIQUE'}
          );
        })
      });
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};