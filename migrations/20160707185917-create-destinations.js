'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.createTable('destinations', {
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
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      organization_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'organizations',
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
      country_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'countries',
            key: 'id'
        }
      },
      address_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'addresses',
            key: 'id'
        }
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      average_rating: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      review_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      is_visible: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN
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
      queryInterface.addIndex(
        'destinations',
        ['country_id','name']
      ).then(function(){
        return queryInterface.addIndex(
          'destinations',
          ['uuid'],
          {indicesType: 'UNIQUE'}
        );
      })
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('destinations');
  }
};