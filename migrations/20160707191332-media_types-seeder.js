'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("media_types", [
      { name: "image", created: Sequelize.fn("NOW"), updated: Sequelize.fn("NOW") },
      { name: "thumbnail", created: Sequelize.fn("NOW"), updated: Sequelize.fn("NOW") },
      { name: "video", created: Sequelize.fn("NOW"), updated: Sequelize.fn("NOW") },
      { name: "image_slide", created: Sequelize.fn("NOW"), updated: Sequelize.fn("NOW") }
    ]);
  },
  down: function (queryInterface, Sequelize) {

  }
};
