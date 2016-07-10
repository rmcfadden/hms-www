'use strict';

module.exports = function(sequelize, DataTypes) {
  var organization = sequelize.define('organization', {
    name: DataTypes.STRING
  }, {
    updatedAt: 'updated',
    createdAt: 'created'
  });
  return organization;
};