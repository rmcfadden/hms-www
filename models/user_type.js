'use strict';
module.exports = function(sequelize, DataTypes) {
  var userType = sequelize.define('user_type', {
    name: DataTypes.STRING
  }, {
    updatedAt: 'updated',
    createdAt: 'created'
  });
  return userType;
};