'use strict';

module.exports = function(sequelize, DataTypes) {
  var media_types = sequelize.define('media_types', {
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
  return media_types;
};
