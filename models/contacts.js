'use strict';

module.exports = function(sequelize, DataTypes) {
  var contacts = sequelize.define('contacts', {
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
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
          model: 'users',
          key: 'id'
      }
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    middle_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_of_birth: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.DATE
    }
  }, {
    updatedAt: 'updated',
    createdAt: 'created'
  });
  return contacts;
};