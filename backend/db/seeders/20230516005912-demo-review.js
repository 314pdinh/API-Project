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
   options.tableName = 'Reviews';
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 1,
      review: 'Lovely view!',
      stars: 5
    },
    {
      spotId: 1,
      userId: 2,
      review: 'ok!',
      stars: 3
    },
    {
      spotId: 1,
      userId: 3,
      review: 'Poorly advertised',
      stars: 2
    },
    {
      spotId: 2,
      userId: 2,
      review: 'Bravissama!',
      stars: 4
    },
    {
      spotId: 2,
      userId: 3,
      review: 'lovely place!',
      stars: 5
    },
    {
      spotId: 2,
      userId: 1,
      review: 'Great scenery!',
      stars: 5
    },
    {
      spotId: 3,
      userId: 3,
      review: 'Gloomy',
      stars: 3
    },
    {
      spotId: 3,
      userId: 1,
      review: 'Not worth it',
      stars: 1
    },
    {
      spotId: 3,
      userId: 2,
      review: 'dirty',
      stars: 1
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
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
