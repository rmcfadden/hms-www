'use strict';

module.exports = function(sequelize, DataTypes) {
  var venue = sequelize.define('venue', {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      organization_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'organizations',
            key: 'id'
        }
      },
      address_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'addresses',
            key: 'id'
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      average_rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      ratings_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },      
      is_visible: {
        allowNull: false,
        defaultValue: true,
        type: DataTypes.BOOLEAN
      }
    }, {
    updatedAt: 'updated',
    createdAt: 'created'
  });
  return venue;
};