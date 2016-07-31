'use strict';

module.exports = function(sequelize, DataTypes) {
  var users_organizations = sequelize.define('users_organizations', {
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
      },
      organization_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'organization',
            key: 'id'
        }
      }
    }, {
    updatedAt: 'updated',
    createdAt: 'created',
    underscored: true
  });
  return users_organizations;
};