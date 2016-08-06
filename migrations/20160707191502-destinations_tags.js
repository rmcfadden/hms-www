'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('destinations_tags', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true        
      },
      destination_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'destinations',
            key: 'id'
        }
      },
      tag_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'tags',
            key: 'id'
        }
      },
      created: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('destinations_tags');
  }
};
