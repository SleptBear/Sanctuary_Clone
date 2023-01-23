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
      review: "Do not go here.",
      stars: 1
     },
     {
      spotId: 1,
      userId: 3,
      review: "amazing just amazing.",
      stars: 5
     },
     {
      spotId: 2,
      userId: 3,
      review: "mid tier place.",
      stars: 3
     },
     {
      spotId: 3,
      userId: 3,
      review: "great, on all accounts.",
      stars: 5
     },
     {
      spotId: 4,
      userId: 3,
      review: "Who wouldn't stay here.",
      stars: 5
     },
     {
      spotId: 5,
      userId: 3,
      review: "Do not trust host, get out.",
      stars: 1
     },
     {
      spotId: 6,
      userId: 3,
      review: "Got what I paid for.",
      stars: 4
     },
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
