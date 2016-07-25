'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.createTable('destination_attributes', {
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
      destination_attribute_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'destination_attribute_categories',
            key: 'id'
        }
      },
      destination_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'destinations',
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
        'destination_attributes',
        ['uuid'],
        {indicesType: 'UNIQUE'}
      );
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('destination_attributes');
  }
};