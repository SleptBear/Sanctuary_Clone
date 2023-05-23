'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: 'Demo',
        lastName: 'Lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: 'Fake',
        lastName: 'User1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: 'Fake',
        lastName: 'User2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'john.smith@gmail.com',
        username: 'johnnysmith',
        firstName: 'John',
        lastName: 'Smith',
        hashedPassword: bcrypt.hashSync('secret password')
      }
    ], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  // async down (queryInterface, Sequelize) {
  //   options.tableName = 'Users';
  //   const Op = Sequelize.Op;
  //   return queryInterface.bulkDelete(options, {
  //     // username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'johnnysmith'] }
  //     id: { [Op.in]: ['1', '2', '3', '4'] }
  //   }, {});
  // }

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users'; // define table name in options object
    return queryInterface.bulkDelete(options); // pass in options object here
  }


    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  };
