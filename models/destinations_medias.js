'use strict';

module.exports = function(sequelize, DataTypes) {
  var destinations_medias = sequelize.define('destinations_medias', {
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
  return destinations_medias;
};