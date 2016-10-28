'use strict';

module.exports = function(sequelize, DataTypes) {
  var galleries = sequelize.define('galleries', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    }, 
    organization_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
          model: 'organizations',
          key: 'id'
      }
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
          model: 'users',
          key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    is_visible: {
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN
    },
    is_approved: {
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN
    },
    is_moderated: {
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN
    } 
  }, {
    updatedAt: 'updated',
    createdAt: 'created',
    underscored: true
  });
  return galleries;
};