'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('inspirations', {
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
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
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
        'inspirations',
        ['name'],
        {indicesType: 'UNIQUE'}
      );
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('inspirations');
  }
};
