'use strict';

module.exports = function(sequelize, DataTypes) {
  var medias = sequelize.define('medias', {
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
  return medias;
};