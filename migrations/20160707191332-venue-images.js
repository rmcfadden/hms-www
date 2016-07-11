'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.createTable('venue_images', {
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
      venue_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'venues',
            key: 'id'
        }
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
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
        'venue_images',
        ['uuid'],
        {indicesType: 'UNIQUE'}
      );
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('venue_images');
  }
};