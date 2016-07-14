'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.createTable('contacts', {
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
      first_name: {
        type: Sequelize.STRING(128),
        allowNull: false
      },
      middle_name: {
        type: Sequelize.STRING(128),
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING(128),
        allowNull: false
      },
      date_of_birth: {
        type: Sequelize.DATE,
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
      queryInterface.addIndex(
        'contacts',
        ['user_id']
      ).then(function(){
        return queryInterface.addIndex(
          'contacts',
          ['uuid'],
          {indicesType: 'UNIQUE'}
        );
      })
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('contacts');
  }
};