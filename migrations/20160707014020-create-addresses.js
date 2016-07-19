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
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      }, 
      address_line1: {
        type: Sequelize.STRING(128),
        allowNull: false
      },
      address_line2: {
        type: Sequelize.STRING(128),
        allowNull: false
      },
      city: {
        type: Sequelize.STRING(64),
        allowNull: false
      },
      province: {
        type: Sequelize.STRING(64),
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
        'addresses',
        ['uuid'],
        {indicesType: 'UNIQUE'}
      );
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('addresses');
  }
};