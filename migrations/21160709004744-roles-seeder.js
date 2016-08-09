'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("roles", [
      { name: "public", created: Sequelize.fn("NOW"), updated: Sequelize.fn("NOW") },
      { name: "admin", created: Sequelize.fn("NOW"), updated: Sequelize.fn("NOW") },
      { name: "editor", created: Sequelize.fn("NOW"), updated: Sequelize.fn("NOW") },
      { name: "organization_admin", created: Sequelize.fn("NOW"), updated: Sequelize.fn("NOW") },
      { name: "organization_editor", created: Sequelize.fn("NOW"), updated: Sequelize.fn("NOW") }
    ]);
  },
  down: function (queryInterface, Sequelize) {

  }
};
