'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
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
   options.tableName = 'Spots';
   await queryInterface.bulkInsert(options, [
    {
      ownerId: 1,
      address: '111 Baker Street',
      city: 'New York City',
      state: 'New York',
      country: 'United States',
      lat: 37.7641234,
      lng: 10.1508180,
      name: 'Too',
      description: 'To be decided',
      price: 299.99
    },
    {
      ownerId: 2,
      address: '167 Laker Avenue',
      city: 'Boston',
      state: 'Massachussettes',
      country: 'United States',
      lat: 65.7179091,
      lng: 83.1401821,
      name: 'Beautiful',
      description: 'Free boat rides',
      price: 524.99
    },
    {
      ownerId: 3,
      address: '917 Blue Street',
      city: 'San Antonio',
      state: 'Texas',
      country: 'United States',
      lat: 34.1747199,
      lng: 81.1794792,
      name: 'Hot',
      description: 'Great foods!',
      price: 99.99
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
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
