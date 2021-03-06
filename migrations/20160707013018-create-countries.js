'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('countries', {
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
      iso_code2: {
        type: Sequelize.STRING(2),
        allowNull: false
      },
      fips: {
        type: Sequelize.STRING(2),
        allowNull: false
      },
      tld: {
        type: Sequelize.STRING(3),
        allowNull: false
      },
      is_visible: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN
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
      queryInterface.addIndex(
        'countries',
        ['name'],
        {indicesType: 'UNIQUE'}
      ).then(function(){
        queryInterface.addIndex(
          'countries',
          ['iso_code2']
        ).then(function(){
          queryInterface.addIndex(
            'countries',
            ['fips']
          ).then(function(){
            return queryInterface.addIndex(
              'countries',
              ['is_visible']
            );
          })
        })
      })
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('countries');
  }
};
