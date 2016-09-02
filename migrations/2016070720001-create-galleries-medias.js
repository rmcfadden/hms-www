'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('galleries_medias', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true        
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
      },
      organization_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'organizations',
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
    return queryInterface.dropTable('galleries_medias');
  }
};
