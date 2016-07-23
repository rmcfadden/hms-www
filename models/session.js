'use strict';

module.exports = function(sequelize, DataTypes) {
  var session = sequelize.define('session', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
          model: 'users',
          key: 'id'
      }
    },
    start: {
      allowNull: false,
      type: DataTypes.DATE
    },
    end: {
      allowNull: false,
      type: DataTypes.DATE
    }, 
    is_expried: {
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN
    }, 
  }, {
    updatedAt: 'updated',
    createdAt: 'created'
  });
  return session;
};