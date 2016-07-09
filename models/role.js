'use strict';

module.exports = function(sequelize, DataTypes) {
  var role = sequelize.define('role', {
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
    name: DataTypes.STRING
  }, {
    updatedAt: 'updated',
    createdAt: 'created'
  });
  return role;
};