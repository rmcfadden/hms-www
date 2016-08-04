'use strict';

module.exports = function(sequelize, DataTypes) {
  var destination_medias = sequelize.define('destination_review', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      }, 
      destination_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'destinations',
            key: 'id'
        }
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      overall_rating: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      service_rating: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    }, {
    updatedAt: 'updated',
    createdAt: 'created',
    underscored: true
  });
  return destination_medias;
};