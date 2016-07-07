'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.createTable('venues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'countries',
            key: 'id'
        }
      },
      address_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'addresses',
            key: 'id'
        }
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      phone_number: {
        type: Sequelize.STRING(64),
        allowNull: false
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      is_visible: {
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
      return queryInterface.addIndex(
        'venues',
        ['name']
      );
    });
  },
  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('venues', ['name']).then(function(){
      return queryInterface.dropTable('venues');
    });
  }
};