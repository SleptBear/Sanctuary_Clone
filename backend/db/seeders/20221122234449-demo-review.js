'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
     {
      spotId: 1,
      userId: 1,
      review: "bad",
      stars: 1
     },
     {
      spotId: 1,
      userId: 3,
      review: "amazing",
      stars: 5
     },
     {
      spotId: 2,
      userId: 3,
      review: "mid",
      stars: 3
     },
     {
      spotId: 3,
      userId: 3,
      review: "great",
      stars: 5
     }
    ], {});
   },

   async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: ["1", "2", "3"] }
    }, {});
  }
};
