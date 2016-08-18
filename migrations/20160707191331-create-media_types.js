'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('media_types', {
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
        'media_types',
        ['name'],
        {indicesType: 'UNIQUE'}
      );
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('media_types');
  }
};
