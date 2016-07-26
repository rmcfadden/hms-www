'use strict';

module.exports = function(sequelize, DataTypes) {
  var setting_categories = sequelize.define('setting_categories', {
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
  return setting_categories;
};
