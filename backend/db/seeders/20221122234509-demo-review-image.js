'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
     {
      reviewId: 1,
      url: 'image.png',
     },
     {
      reviewId: 2,
      url: 'image.png',
     },
     {
      reviewId: 3,
      url: 'image.png',
     }
    ], {});
   },

   async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: ["1", "2", "3"] }
    }, {});
  }
};
