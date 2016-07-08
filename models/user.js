'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    id: { primaryKey: true, type: DataTypes.BIGINT, autoIncrement: true },
    uuid : { type: DataTypes.UUIDV4, defaultValue: DataTypes.UUIDV4 },
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