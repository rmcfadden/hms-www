'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.createTable('destination_reviews', {
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
      destination_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'destinations',
            key: 'id'
        }
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      overall_rating: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      service_rating: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      is_moderated: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      is_approved: {
        allowNull: false,
        defaultValue: false,
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
        'destination_reviews',
        ['uuid'],
        {indicesType: 'UNIQUE'}
      );
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('destination_reviews');
  }
};