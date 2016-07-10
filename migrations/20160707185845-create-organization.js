'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('organizations', {
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
        'organizations',
        ['name'],
        {indicesType: 'UNIQUE'}
      );
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('organizations',['name']).then(function(){
      return queryInterface.dropTable('organizations');
    });
  }
};
