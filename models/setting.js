'use strict';

module.exports = function(sequelize, DataTypes) {
  var settings = sequelize.define('settings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    setting_category_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
          model: 'setting_categories',
          key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    updatedAt: 'updated',
    createdAt: 'created'
  });
  return settings;
};