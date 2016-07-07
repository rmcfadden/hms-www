'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.createTable('addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      address_line1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address_line2: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      postal_code: {
        type: Sequelize.STRING(32),
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
      region_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'regions',
            key: 'id'
        }
      },
      created: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('addresses');
  }
};