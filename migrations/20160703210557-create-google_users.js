'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.createTable('google_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
      },
      google_user_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
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
      return queryInterface.addIndex(
        'google_users',
        ['user_id']
      );
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('google_users');
  }
};