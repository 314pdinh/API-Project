'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'SpotImages'
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-994970759590736178/original/50c3cb59-5b59-4a58-bd86-1997fec4dc6d.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-994970759590736178/original/554d7542-d508-46f5-9782-1ded52b0be52.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-994970759590736178/original/fb61df81-7fe5-4da0-a2f5-e2e09e7c3eef.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-994970759590736178/original/5f992cf4-9339-46aa-a9e8-d32f9a64a45c.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-994970759590736178/original/15575dd3-c4d0-4a0e-8b6d-5e8845c7ce1d.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/airflow/Hosting-29420752/original/d2f1c6b1-6b3e-40b2-b654-41bfe2b43af9.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/airflow/Hosting-29420752/original/c05b9002-c2cd-435b-ab25-93f8a444c599.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/airflow/Hosting-29420752/original/5672aa0e-5437-4286-9e4d-382ac62bec02.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/airflow/Hosting-29420752/original/165360d4-cb40-46bc-86be-e0df6fdc6e6f.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/airflow/Hosting-29420752/original/5e2adbda-87c4-4bc1-b132-88b69173f94e.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-703593435255190096/original/f4fb95bf-91a6-49a7-9b28-3c39eb7bad7e.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-703593435255190096/original/9fc9762d-b5c7-45fe-94c3-2fc1990332ab.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-703593435255190096/original/e9339a33-9d28-4a66-87c8-363942668bc7.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-703593435255190096/original/6ed7cfda-97aa-426a-91ad-967e27c27e67.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-703593435255190096/original/09d207d8-2c52-438d-8a7c-a8a9802cee36.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-50808975/original/1dd8464a-d1af-4edd-8a88-0ba84c9623dd.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-50808975/original/71e4344b-e280-4b28-9218-20a43733c7d4.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-50808975/original/f633e209-0154-4db1-bef7-b7d85bb28aef.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NTA4MDg5NzU%3D/original/53f16ef8-dcc5-4966-ab74-c106614845bb.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-51453470/original/afeb8c83-07f6-4f74-bd1a-14ee3de8ad59.png?im_w=720',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-765239836698459438/original/1a4daa0c-9574-4e3e-86e8-55f6130398b9.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-765239836698459438/original/7e2eb7a4-96a6-4d65-a87d-f172342aa1ee.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-765239836698459438/original/34e286f6-e7a0-4e7b-839c-67a83b11c940.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-765239836698459438/original/2c5bed00-e664-474e-be8e-31544d55ddd3.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-765239836698459438/original/0c3c649a-3b0d-46ba-a946-25f448fff1ab.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/ff7aa83d-4374-4a76-a313-94303c012a55.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/13c423c3-baae-4190-b9fc-3d70904144ad.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-44001776/original/4699cba3-6d7b-4c29-9389-d315bf865830.png?im_w=720',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-44001776/original/bbedd4a0-bf11-417f-a2f2-cce64b2983e6.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/b7463257-ebec-410f-9b8e-5a886a40efdc.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-568086398763101665/original/3b53f5db-841e-4055-9c26-0ce9ee6e40df.png?im_w=1200',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-568086398763101665/original/f97e890e-52e0-42ef-b8df-18c383fa8fdc.png?im_w=720',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-568086398763101665/original/5d1025c6-ed4e-4da3-bb23-7d5fb101d1e3.png?im_w=720',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-568086398763101665/original/5c4cb6df-e2f8-4fd5-a5f0-0ee320b57aa4.png?im_w=720',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-568086398763101665/original/ce114edc-53ea-4983-a039-12b7ec1253b2.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/b7c9264d-73c9-45c3-882e-6e9577d63d68.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/4588d88f-0224-42f4-94cb-594f4d362fba.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/062ef52a-9b4f-4301-9413-e757d1758b3f.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/e922f0c3-9a3d-4877-983a-56849ce92e18.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/0aec8a6e-1d31-4ff2-b7d4-184d71a801cf.jpg?im_w=480',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1048761407045541691/original/40fa74e0-82df-4559-86c9-e1cf797930d3.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1048761407045541691/original/49926ed5-c035-4e7c-b829-b4638ac8fe71.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1048761407045541691/original/1eec3149-2a39-4f6e-a2fa-06eb9872670a.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1048761407045541691/original/27220c26-92d6-456c-b465-332c28ec27b6.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA0ODc2MTQwNzA0NTU0MTY5MQ%3D%3D/original/d594f8e0-1878-4f0e-87b4-15caa308f376.jpeg?im_w=720',
        preview: true
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
    }, {})
  }
};
