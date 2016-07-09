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
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      iso_code2: {
        type: Sequelize.STRING(2),
        allowNull: false
      },
      iso_code3: {
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
          ['iso_code2'],
          {indicesType: 'UNIQUE'}
        ).then(function(){
          queryInterface.addIndex(
            'countries',
            ['iso_code3'],
            {indicesType: 'UNIQUE'}
          ).then(function(){
            queryInterface.addIndex(
              'countries',
              ['is_visible']
            ).then(function(){
              return queryInterface.addIndex(
                'countries',
                ['uuid']
              );
            })
          })
        })
      })
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('countries');
  }
};
