'use strict';

module.exports = function(sequelize, DataTypes) {
  var countries = sequelize.define('countries', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    iso_code2: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    fips: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    tld: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    is_visible: {
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN
    }
  }, {
    tableName : 'countries',
    updatedAt: 'updated',
    createdAt: 'created'
  });
  return countries;

};