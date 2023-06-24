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
    {
      ownerId: 3,
      address: "400 Lanky Street",
      city: "Portland",
      state: "Oregon",
      country: "United States of America",
      lat: 40.7645358,
      lng: 74.4730327,
      name: "Retro Camper",
      description: "Pristine and cozy vintage trailer nestled in Forest Park.  Enjoy a spacious patio, uninterrupted views of the woods, dreamy outdoor bath, and fire pit, all minutes to the center of PDX. Creature comforts all provided for a whimsical glamping experience.",
      price: 84
    },
    {
      ownerId: 3,
      address: "400 Up Street",
      city: "Alachua",
      state: "Florida",
      country: "United States of America",
      lat: 40.7645358,
      lng: 74.4730327,
      name: "Bliss Villa",
      description: "Welcome to Lake Worth Beach's coolest vacation rental. This million+ dollar property boasts an amazing courtyard with a HEATED pool, dining nooks, lounge chairs, grill, outdoor shower & cabana BA - surrounded by 4 private villas. ",
      price: 163
    },
    {
      ownerId: 3,
      address: "50 Nowhere Street",
      city: "Lake Worth",
      state: "Florida",
      country: "United States of America",
      lat: 40.7645358,
      lng: 74.4730327,
      name: "Pileated Place",
      description: "Welcome to our A-frame cabin, nestled into the start of a small pine forest. It is complete with two cots, a hinged wall/awning, firepit, hammock, and elevated spaces to eat. Just bring your sleeping bag and other camp gear that helps you feel cozy and at home in the woodslands.",
      price: 91
    },
    {
      ownerId: 3,
      address: "50 Beach Street",
      city: "Seacrest",
      state: "Florida",
      country: "United States of America",
      lat: 40.7645358,
      lng: 74.4730327,
      name: "Seacrest Condo",
      description: "It's all about the Location, the View & the Details!  Our newly renovated condo is brand new to the rental market and directly on the Beach on Scenic Hwy. 30A! Come see why this is our happy place.  Enjoy sunrises, sunsets, your coffee or cocktails on our private balcony with private beach access to the sugar-white sand and beautiful, emerald-green water of the Gulf of Mexico on Seacrest Beach. ",
      price: 421
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
