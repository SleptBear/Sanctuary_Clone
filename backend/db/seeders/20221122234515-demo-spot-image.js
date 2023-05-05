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
     },
     {
      spotId: 4,
      url: 'https://pacific-homes.com/wp-content/uploads/2015/06/The-Bubble-House2.jpg',
      preview: true
     },
     {
      spotId: 5,
      url: 'https://cdn.architecturendesign.net/wp-content/uploads/2014/06/AD-Two-Modern-Mansions-Sunset-Plaza-Drive-Ameen-Ayoub-Design-Studio-CoverImage.jpg',
      preview: true
     },
     {
      spotId: 6,
      url: 'https://inhabitat.com/wp-content/blogs.dir/1/files/2017/10/PlansMatter4.jpg',
      preview: true
     }
    ], {});
   },

   async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages'; // define table name in options object
    return queryInterface.bulkDelete(options); // pass in options object here
  }
  //  async down (queryInterface, Sequelize) {
  //   options.tableName = 'SpotImages';
  //   const Op = Sequelize.Op;
  //   return queryInterface.bulkDelete(options, {
  //     id: { [Op.in]: ["1", "2", "3", "4", "5", "6"] }
  //   }, {});
  // }
};
