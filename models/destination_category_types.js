'use strict';

module.exports = function(sequelize, DataTypes) {
  var destination_category_types = sequelize.define('destination_category_types', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    updatedAt: 'updated',
    createdAt: 'created'
  });
  return destination_category_types;
};
