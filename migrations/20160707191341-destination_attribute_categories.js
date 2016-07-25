'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('destination_attribute_categories', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true        
      },
      category_type_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'destination_attribute_category_types',
            key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }).then(function(){
      return queryInterface.addIndex(
        'destination_attribute_categories',
        ['category_type_id', 'name'],
        {indicesType: 'UNIQUE'}
      );
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('destination_attribute_categories');
  }
};
