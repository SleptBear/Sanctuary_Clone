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
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-653038076124532420/original/03676ed4-c004-4f3c-9a98-84320aa1024e.jpeg?im_w=1200',
      preview: true
     },
     {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-54266126/original/535bf87d-0858-409f-b6d6-c0507b8f5b82.jpeg?im_w=1200',
      preview: true
     },
     {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/fd6308a0-721a-4917-83be-e18a8fa78e64.jpg?im_w=1200',
      preview: true
     },
     {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/e0f636a2-b397-464a-9bf2-95a1ac5c29be.jpg?im_w=1200',
      preview: true
     },
     {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-37258899/original/2dec8764-eb96-4436-892c-9e6c08c3ca5a.jpeg?im_w=1200',
      preview: true
     },
     {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49775375/original/22dec4d1-4da7-46f4-b717-fa635cc9a822.jpeg?im_w=1200',
      preview: true
     },
     {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/34f3170e-c71c-4df3-a01b-b20c56ea8bf8.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/bd9a8441-e2a1-436a-9d96-48303b8ca1b1.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/12bfdb16-925c-4e74-87f5-8d8391d4d997.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/b4e60182-04c7-4096-927b-ecf7ba7e0f55.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/34f3170e-c71c-4df3-a01b-b20c56ea8bf8.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-54266126/original/8b44f6af-80e5-4d0a-b107-797645118527.jpeg?im_w=720',
      preview: false
     },
     {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-54266126/original/2e6710a8-c37d-4cae-a86c-b198b9cced4f.jpeg?im_w=720',
      preview: false
     },
     {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-54266126/original/e497fa4a-356e-4e98-8f39-dbd45720b79f.jpeg?im_w=720',
      preview: false
     },
     {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/5a50bf7a-354c-4938-a4fb-6e290813d108.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/72f451ce-4c98-4f93-ac50-eddf8b03a85f.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/b7da9c0b-828a-4fac-9ea6-3d7362a280f9.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/3e82c14b-0a92-4e77-9bea-8edeb4b1a120.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/923bc46b-21bc-4a23-bb66-98fbc8360c76.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/1c6a0ef1-a475-4379-b789-21fd2b8136b4.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/28500e98-fda8-4704-962a-c2cdb759270a.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/37ae5c19-9648-4022-b714-80cf0ddfa09f.jpg?im_w=720',
      preview: false
     },
     {
      spotId:5,
      url: 'https://a0.muscache.com/im/pictures/pro_photo_tool/Hosting-37258899-unapproved/original/44b83846-557b-4272-9550-4f81d9ecf55f.JPEG?im_w=720',
      preview: false
     },
     {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/d2434e46-9d33-40f0-b6b7-bab8ca94006c.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/77d8ef5e-8a57-440d-b8f4-3d3ea95214ce.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/41f1888f-d550-4b3b-84ba-2aa703c5d182.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49775375/original/14e54fca-1a31-4448-b092-4f817cc1da2f.jpeg?im_w=720',
      preview: false
     },
     {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49775375/original/a984019a-8d71-4440-9490-b1f1e75cac6b.jpeg?im_w=720',
      preview: false
     },
     {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49775375/original/8821fb54-f49e-4345-80d4-bcf61e7915bc.jpeg?im_w=720',
      preview: false
     },
     {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49775375/original/1e93f281-baa0-4bf0-b69d-cc978976fe1b.jpeg?im_w=720',
      preview: false
     },
     {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/965e4cd6-4756-4c90-8a45-50ca1f20fe0a.jpg?im_w=1200',
      preview: true
     },
     {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/99e24549-a24f-4c47-afb6-2016dad533e6.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/b8b3bf29-8fe1-477c-8617-194fd671e66e.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/1f23f56e-ebbe-43b6-8fc9-92bed6520f4a.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/70a362ef-31d8-4549-8234-846caf915f77.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/20367e2f-5234-454c-86fc-1fa24f5d6c3f.jpg?im_w=1200',
      preview: true
     },
     {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/43a33169-6481-4ad2-a60e-8c718d1ec300.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/e9a8cf2c-0524-4383-82c8-079f86539f6e.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/22b17071-ab04-4b80-b094-4bd51083f0ee.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/fbed2615-90ff-43ef-9426-5ff3e736650e.jpg?im_w=720',
      preview: false
     },
     {
      spotId:9,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-854285215008266310/original/32b10397-01d0-4855-8169-b5fd6906647c.jpeg?im_w=1200',
      preview: true
     },
     {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/1bbcd01a-3015-4860-a408-e2a2657f8477.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/4e721bcc-844c-42e3-a2df-7c40906557a7.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/438d86f3-32b1-4932-b13e-e4777e5fd531.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/36e76f2b-3374-43af-94f2-0a59c18424e4.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-563607006579215693/original/dc58ed57-9334-477d-9a93-8b7ca3ab0493.jpeg?im_w=1200',
      preview: true
     },
     {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-563607006579215693/original/48dbc60a-e34d-4341-a764-572adbee60d8.jpeg?im_w=720',
      preview: false
     },
     {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-563607006579215693/original/4ead51ee-0227-4c82-b0d4-34b305126643.jpeg?im_w=720',
      preview: false
     },
     {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-563607006579215693/original/b929db5c-a732-48d7-b70e-c93e6f417f8a.jpeg?im_w=720',
      preview: false
     },
     {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-563607006579215693/original/ff932670-35ff-4a73-b789-ab8814659062.jpeg?im_w=720',
      preview: false
     },
     {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/80bc3f64-adb3-45d5-afe0-058e1bcccbe8.jpg?im_w=1200',
      preview: true
     },
     {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/45592a42-812a-40bd-a7ce-11939a9ff131.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/dfdecb4f-25cf-49ec-a8d5-4af9e0fb77b3.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/321bcd9c-c2b3-4cea-bcb5-2c06d8f81b4b.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/3aeb67fc-1dab-4f6b-88cd-72eea042fa30.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/39231e44-2464-4739-ac7d-2bb77a4a2c23.jpg?im_w=1200',
      preview: true
     },
     {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/e4a8646b-4634-4da1-b547-95c25c78538b.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/fa66f66e-bfde-4754-9356-5e61c83f2671.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/730b511a-a81c-42ef-b813-3a64a327feba.jpg?im_w=720',
      preview: false
     },
     {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/cf5d696d-0166-4729-b1f4-bcd436c01630.jpg?im_w=720',
      preview: false
     },
    //  {
    //   spotId: ,
    //   url: '',
    //   preview: true
    //  },
    //  {
    //   spotId: ,
    //   url: '',
    //   preview: true
    //  },
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
