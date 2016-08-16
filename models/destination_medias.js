'use strict';

module.exports = function(sequelize, DataTypes) {
  var destination_medias = sequelize.define('destination_medias', {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      media_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'media_types',
            key: 'id'
        }
      },
      destination_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'destinations',
            key: 'id'
        }
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      ordinal: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      width: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      is_approved: {
        allowNull: false,
        defaultValue: true,
        type: DataTypes.BOOLEAN
      }
    }, {
    updatedAt: 'updated',
    createdAt: 'created',
    underscored: true
  });
  return destination_medias;
};