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
        url: 'https://a.cdn-hotels.com/gdcs/production13/d377/69a90c80-b69c-11e8-a439-0242ac110006.jpg?impolicy=fcrop&w=800&h=533&q=medium',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://media.cntraveler.com/photos/63482b255e7943ad4006df0b/1:1/w_1280%2Ch_1280%2Cc_limit/tokyoGettyImages-1031467664.jpeg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/0c/ea/bb/ottawa-city-view.jpg?w=500&h=300&s=1',
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
      spotId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
