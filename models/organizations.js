'use strict';

module.exports = function(sequelize, DataTypes) {
  var organization = sequelize.define('organizations', {
    name: DataTypes.STRING
  }, {
    updatedAt: 'updated',
    createdAt: 'created'
  });
  return organization;
};