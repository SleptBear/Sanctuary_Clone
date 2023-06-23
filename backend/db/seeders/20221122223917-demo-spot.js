'use strict';


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = 'Spots';
   return queryInterface.bulkInsert(options, [
    {
      ownerId: 1,
      address: "aaa123 Disney Lane",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "App Academy",
      description: "Place where web developers are created",
      price: 123
    },
    {
      ownerId: 2,
      address: "bbb123 Disney Lane",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "App Academy",
      description: "Place where web developers are created",
      price: 123
    },
    {
      ownerId: 3,
      address: "ccc123 Disney Lane",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "App Academy",
      description: "Place where web developers are created",
      price: 123
    },
    {
      ownerId: 3,
      address: "123 Pyro Street",
      city: "Dallas",
      state: "Texas",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "App Academy",
      description: "Place where web developers are created",
      price: 321
    },
    {
      ownerId: 3,
      address: "578 Combustion Ave",
      city: "Los Angeles",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "App Academy",
      description: "Place where web developers are created",
      price: 90
    },
    {
      ownerId: 3,
      address: "466 Lanky Street",
      city: "Jersey City",
      state: "New Jersey",
      country: "United States of America",
      lat: 40.7645358,
      lng: 74.4730327,
      name: "Serviced Apartment",
      description: "Place to hide away in comfort and style",
      price: 60
    },
    {
      ownerId: 3,
      address: "466 Lanky Street",
      city: "Oregon City",
      state: "Oregon",
      country: "United States of America",
      lat: 40.7645358,
      lng: 74.4730327,
      name: "Artistic Woodshed",
      description: "Closed in country Sanctuary. Affordable glamping for anyone",
      price: 81
    },
    {
      ownerId: 3,
      address: "455 Lanky Street",
      city: "Portland",
      state: "Oregon",
      country: "United States of America",
      lat: 40.7645358,
      lng: 74.4730327,
      name: "Free Range Home",
      description: "NE Portland spot with 1 bedroom and an office/tv setup to do work when needed.",
      price: 84
    },
   ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots'; // define table name in options object
    return queryInterface.bulkDelete(options); // pass in options object here
  }

  // async down (queryInterface, Sequelize) {
  //   options.tableName = 'Spots';
  //   const Op = Sequelize.Op;
  //   return queryInterface.bulkDelete(options, {
  //     // address: { [Op.in]: ["aaa123 Disney Lane", "bbb123 Disney Lane", "ccc123 Disney Lane","123 Pyro Street", "578 Combustion Ave", "246 Budding Street"] }
  //     id: { [Op.in]: ["1", "2", "3", "4", "5", "6"] }
  //   }, {});
  // }
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
};
