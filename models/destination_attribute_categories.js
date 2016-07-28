'use strict';

module.exports = function(sequelize, DataTypes) {
  var destination_attribute_categories = sequelize.define('destination_attribute_categories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    category_type_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
          model: 'destination_attribute_category_types',
          key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    updatedAt: 'updated',
    createdAt: 'created'
  });
  return destination_attribute_categories;
};