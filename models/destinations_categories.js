'use strict';

module.exports = function(sequelize, DataTypes) {
  var destinations_categories = sequelize.define('destinations_categories', {
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
      destination_category_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'destination_category_types',
            key: 'id'
        }
      }
    }, {
    updatedAt: 'updated',
    createdAt: 'created',
    underscored: true
  });
  return destinations_categories;
};