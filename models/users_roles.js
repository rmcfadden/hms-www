'use strict';

module.exports = function(sequelize, DataTypes) {
  var users_roles = sequelize.define('users_roles', {
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'roles',
            key: 'id'
        }
      }
    }, {
    updatedAt: 'updated',
    createdAt: 'created',
    underscored: true
  });
  return users_roles;
};