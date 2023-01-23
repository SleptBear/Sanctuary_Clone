'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
     {
      spotId: 1,
      url: 'https://www.busytourist.com/wp-content/uploads/2019/06/Bora-Bora-French-Polynesia.jpg.webp',
      preview: true
     },
     {
      spotId: 2,
      url: 'https://i.ytimg.com/vi/hxeITyt_XfU/maxresdefault.jpg',
      preview: true
     },
     {
      spotId: 3,
      url: 'https://travel.home.sndimg.com/content/dam/images/travel/stock/2018/5/2/iStock_Moorea_budget-beaches.jpg.rend.hgtvcom.616.462.suffix/1525279728795.jpeg',
      preview: true
     }
    ], {});
   },

   async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: ["1", "2", "3"] }
    }, {});
  }
};
