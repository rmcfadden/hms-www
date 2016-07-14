'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('settings', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true        
      },
      setting_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'setting_categories',
            key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING(128),
        allowNull: false
      },
      value: {
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
        'settings',
        ['setting_category_id','name'],
        {indicesType: 'UNIQUE'}
      );
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('settings');
  }
};
