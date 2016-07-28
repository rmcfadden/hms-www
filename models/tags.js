'use strict';

module.exports = function(sequelize, DataTypes) {
  var tags = sequelize.define('tags', {
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
  return tags;
};
