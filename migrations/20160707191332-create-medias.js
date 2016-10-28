'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.createTable('medias', {
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
      media_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'media_types',
            key: 'id'
        }
      },
      location: {
        type: Sequelize.STRING(128),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(128),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      ordinal: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      height: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      width: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      is_approved: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN
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
        'medias',
        ['uuid'],
        {indicesType: 'UNIQUE'}
      );
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('medias');
  }
};