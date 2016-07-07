'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('regions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true        
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      is_visible: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN
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
      queryInterface.addIndex(
        'regions',
        ['is_visible']
      );
    }).then(function(){
      return queryInterface.addIndex(
        'regions',
        ['name'],
        {indicesType: 'UNIQUE'}
      );
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('regions',['name']).then(function(){
      queryInterface.removeIndex('regions',['is_visible']).then(function(){
        return queryInterface.dropTable('regions');
      });
    }); 
  }
};
