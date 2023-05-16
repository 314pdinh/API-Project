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
      lat: 25.55,
      lng: 10.15,
      name: 'Too',
      description: 'To be decided',
      price: 299.99
    },
    {
      ownerId: 2,
      address: '167 Laker Street',
      city: 'New York City',
      state: 'New York',
      lat: 53.95,
      lng: 11.75,
      name: 'something',
      description: 'To be decided too',
      price: 274.99
    },
    {
      ownerId: 1,
      address: '111 Baker Street',
      city: 'New York City',
      state: 'New York',
      lat: 25.55,
      lng: 10.15,
      name: 'Too',
      description: 'To be decided',
      price: 299.99
    },


   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
