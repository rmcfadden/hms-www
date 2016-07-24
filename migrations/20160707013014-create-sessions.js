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
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
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
      last_activity_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      hit_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },        
      is_expired: {
        allowNull: false,
        defaultValue: false,
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
        queryInterface.addIndex(
          'sessions',
          ['uuid'],
          {indicesType: 'UNIQUE'}
        );
      }).then(function(){
        queryInterface.addIndex(
          'sessions',
          ['token'],
          {indicesType: 'UNIQUE'}
        );
      }).then(function(){
        return queryInterface.addIndex(
          'sessions',
          ['last_activity_date'],
          {indicesType: 'UNIQUE'}
        );
      })
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('sessions');
  }
};