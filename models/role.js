'use strict';

module.exports = function(sequelize, DataTypes) {
  var userType = sequelize.define('role', {
    name: DataTypes.STRING
  }, {
    updatedAt: 'updated',
    createdAt: 'created'
  });
  return userType;
};