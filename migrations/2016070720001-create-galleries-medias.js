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
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      gallery_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'galleries',
            key: 'id'
        }
      },
      media_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'medias',
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
