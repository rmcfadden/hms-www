'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    password_salt: DataTypes.STRING,
  }, {
    updatedAt: 'updated',
    createdAt: 'created'
  });
  return user;
};