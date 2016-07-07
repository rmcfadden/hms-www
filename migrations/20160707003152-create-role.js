'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('roles', {
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
        'roles',
        ['name'],
        {indicesType: 'UNIQUE'}
      );
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('roles',['name']).then(function(){
      return queryInterface.dropTable('roles');
    });
  }
};
