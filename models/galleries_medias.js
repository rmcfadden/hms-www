'use strict';

module.exports = function(sequelize, DataTypes) {
  var galleries_medias = sequelize.define('galleries_medias', {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      gallery_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'galleries',
            key: 'id'
        }
      },
      media_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'medias',
            key: 'id'
        }
      }
    }, {
    updatedAt: 'updated',
    createdAt: 'created',
    underscored: true
  });
  return galleries_medias;
};