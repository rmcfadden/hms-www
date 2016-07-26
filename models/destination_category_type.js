'use strict';

module.exports = function(sequelize, DataTypes) {
  var role = sequelize.define('destination_category_type', {
    name: DataTypes.STRING
  }, {
    updatedAt: 'updated',
    createdAt: 'created'
  });
  return role;
};