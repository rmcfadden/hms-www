'use strict';

module.exports = function(sequelize, DataTypes) {
  var address = sequelize.define('address', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    }, 
    address_line1: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    address_line2: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    province: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    postal_code: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'countries',
          key: 'id'
      }
    },
  
}, {
    updatedAt: 'updated',
    createdAt: 'created'
  });
  return address;
};