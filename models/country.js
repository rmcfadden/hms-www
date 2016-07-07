'use strict';

module.exports = function(sequelize, DataTypes) {
  var role = sequelize.define('country', {
    name: DataTypes.STRING
  }, {
    tableName : 'countries',
    updatedAt: 'updated',
    createdAt: 'created'
  });
  return role;
};