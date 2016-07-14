'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.createTable('sessions', {
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
      token: {
        type: Sequelize.STRING,
        allowNull: false
      },
      start: {
        allowNull: false,
        type: Sequelize.DATE
      },
      end: {
        allowNull: false,
        type: Sequelize.DATE
      }, 
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
      },
      is_expried: {
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
        'sessions',
        ['user_id']
      ).then(function(){
        return queryInterface.addIndex(
          'sessions',
          ['uuid'],
          {indicesType: 'UNIQUE'}
        );
      })
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('sessions');
  }
};