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
   options.tableName = 'Bookings';
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 1,
      startDate: '2023-01-01',
      endDate: '2023-01-09'
    },
    {
      spotId: 2,
      userId: 1,
      startDate: '2023-03-15',
      endDate: '2023-04-27'
    },
    {
      spotId: 3,
      userId: 1,
      startDate: '2023-06-25',
      endDate: '2023-07-17'
    },
    {
      spotId: 2,
      userId: 2,
      startDate: '2023-02-15',
      endDate: '2023-02-27'
    },
    {
      spotId: 1,
      userId: 2,
      startDate: '2023-04-15',
      endDate: '2023-04-27'
    },
    {
      spotId: 3,
      userId: 2,
      startDate: '2023-03-05',
      endDate: '2023-03-16'
    },
    {
      spotId: 3,
      userId: 3,
      startDate: '2023-03-05',
      endDate: '2023-03-21'
    },
    {
      spotId: 2,
      userId: 3,
      startDate: '2023-01-15',
      endDate: '2023-01-27'
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
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
