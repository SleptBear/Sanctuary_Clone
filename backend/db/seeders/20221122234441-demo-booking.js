'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
     {
      spotId: 1,
      userId: 1,
      startDate: new Date("1994-12-10"),
      endDate: new Date("1995-12-10")
     },
     {
      spotId: 2,
      userId: 2,
      startDate: new Date("1994-12-10"),
      endDate: new Date("1996-12-10")
     },
    {
      spotId: 3,
      userId: 3,
      startDate: new Date("1994-12-10"),
      endDate: new Date("1997-12-10")
    }
    ], {});
   },

   async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings'; // define table name in options object
    return queryInterface.bulkDelete(options); // pass in options object here
  }

  //  async down (queryInterface, Sequelize) {
  //   options.tableName = 'Bookings';
  //   const Op = Sequelize.Op;
  //   return queryInterface.bulkDelete(options, {
  //     id: { [Op.in]: ["1", "2", "3"] }
  //   }, {});
  // }
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
};
