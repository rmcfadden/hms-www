'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.createTable('galleries', {
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
      organization_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'organizations',
            key: 'id'
        }
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      is_visible: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      is_approved: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      is_moderated: {
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
    }).then(queryInterface.addIndex(
      'galleries',
      ['organization_id']
    )).then(queryInterface.addIndex(
      'galleries',
      ['user_id']
    )).then(queryInterface.addIndex(
      'galleries',
      ['uuid'],
      {indicesType: 'UNIQUE'}
    )).then(queryInterface.addIndex(
      'galleries',
      ['name'],
      {indicesType: 'UNIQUE'}
    ));
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('galleries');
  }
};