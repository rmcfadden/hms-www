'use strict';

module.exports = function(sequelize, DataTypes) {
  var session = sequelize.define('session', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
          model: 'users',
          key: 'id'
      }
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
    start: {
      allowNull: false,
      type: DataTypes.DATE
    },
    end: {
      allowNull: false,
      type: DataTypes.DATE
    }, 
    last_activity_date: {
      allowNull: false,
      type: DataTypes.DATE
    },
    hit_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },        
    is_expired: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    }
  }, {
    updatedAt: 'updated',
    createdAt: 'created'
  });
  return session;
};