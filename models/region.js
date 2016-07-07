'use strict';

module.exports = function(sequelize, DataTypes) {
  var role = sequelize.define('region', {
    name: DataTypes.STRING
  }, {
    updatedAt: 'updated',
    createdAt: 'created'
  });
  return role;
};