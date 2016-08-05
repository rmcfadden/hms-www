'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("destination_category_types", [
      { name: "romantic", created: Sequelize.fn("NOW"), updated: Sequelize.fn("NOW") },
      { name: "adventurous", created: Sequelize.fn("NOW"), updated: Sequelize.fn("NOW") },
      { name: "scenic", created: Sequelize.fn("NOW"), updated: Sequelize.fn("NOW") },
      { name: "tropical", created: Sequelize.fn("NOW"), updated: Sequelize.fn("NOW") },
      { name: "coastal", created: Sequelize.fn("NOW"), updated: Sequelize.fn("NOW") },
      { name: "rural", created: Sequelize.fn("NOW"), updated: Sequelize.fn("NOW") },
      { name: "cosmopolitan", created: Sequelize.fn("NOW"), updated: Sequelize.fn("NOW") },
      { name: "vineyard", created: Sequelize.fn("NOW"), updated: Sequelize.fn("NOW") },
      { name: "road trip", created: Sequelize.fn("NOW"), updated: Sequelize.fn("NOW") },
      { name: "cruise", created: Sequelize.fn("NOW"), updated: Sequelize.fn("NOW") },
      { name: "ski", created: Sequelize.fn("NOW"), updated: Sequelize.fn("NOW") },
      { name: "hobby", created: Sequelize.fn("NOW"), updated: Sequelize.fn("NOW") },
      { name: "fitness", created: Sequelize.fn("NOW"), updated: Sequelize.fn("NOW") }
    ]);
  },
  down: function (queryInterface, Sequelize) {
  }
};
    