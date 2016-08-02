'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
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
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password_salt: {
        type: DataTypes.STRING,
        allowNull: false
      },
      is_enabled: {
        allowNull: false,
        defaultValue: true,
        type: DataTypes.BOOLEAN
      },
      is_subscribed: {
        allowNull: false,
        defaultValue: true,
        type: DataTypes.BOOLEAN
      },
      is_subscribed_to_partners: {
        allowNull: false,
        defaultValue: true,
        type: DataTypes.BOOLEAN
      },
  }, {
    updatedAt: 'updated',
    createdAt: 'created'
  });
  return user;
};

