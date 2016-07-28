'use strict';

module.exports = function(sequelize, DataTypes) {
  var inspirations = sequelize.define('inspirations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    updatedAt: 'updated',
    createdAt: 'created'
  });
  return inspirations;
};
