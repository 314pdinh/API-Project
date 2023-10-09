'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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
      name: 'Charming City Studio',
      description: "Discover a cozy urban retreat with modern amenities, perfect for solo travelers or couples exploring the city. Enjoy nearby attractions and vibrant nightlife, returning to a comfortable, intimate space.",
      price: 299.99
    },
    {
      ownerId: 1,
      address: '267 Yoyo Street',
      city: 'Atlantic City',
      state: 'New Jersey',
      country: 'United States',
      lat: 79.7797794,
      lng: 10.2000009,
      name: 'Beachfront Paradise',
      description: "Immerse yourself in a beachfront oasis, waking up to stunning ocean views and direct beach access. Ideal for a tranquil coastal getaway, with the soothing sound of waves as your soundtrack.",
      price: 199.99
    },
    {
      ownerId: 1,
      address: '123 Order Street',
      city: 'Newark',
      state: 'New Jersey',
      country: 'United States',
      lat: 33.7242424,
      lng: 10.1242428,
      name: 'Rustic Cabin in the Woods',
      description: "Escape to nature in this secluded cabin, surrounded by trees and tranquility. Cozy up by the fireplace, reconnect with loved ones, and embrace the serenity of a rustic woodland retreat.",
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
      name: 'Luxury Penthouse with City Views',
      description: "Indulge in opulent living in a high-rise penthouse, boasting panoramic city vistas and upscale furnishings. Experience the height of luxury while being in the heart of the urban buzz.",
      price: 524.99
    },
    {
      ownerId: 2,
      address: '100 Popa Drive',
      city: 'Boston',
      state: 'Massachussettes',
      country: 'United States',
      lat: 94.7258580,
      lng: 12.1402455,
      name: 'Historic Downtown Loft',
      description: "Immerse in the city's heritage from a stylish downtown loft, just steps away from cultural landmarks and lively streets. Experience a blend of history and modern urban living in this chic accommodation.",
      price: 424.99
    },
    {
      ownerId: 2,
      address: '201 Bea Avenue',
      city: 'Boston',
      state: 'Massachussettes',
      country: 'United States',
      lat: 55.7133491,
      lng: 63.2320131,
      name: 'Family-Friendly Suburban Home',
      description: "Enjoy a spacious, child-friendly suburban home, perfect for families seeking a peaceful retreat. Relax in the backyard, explore nearby parks, and create lasting memories in this comfortable family space.",
      price: 399.99
    },
    {
      ownerId: 3,
      address: '917 Blue Street',
      city: 'San Antonio',
      state: 'Texas',
      country: 'United States',
      lat: 34.1747199,
      lng: 81.1794792,
      name: 'Architectural Marvel',
      description: "Stay in an architecturally stunning house with a private pool and cutting-edge design. Experience a blend of artistry and luxury, indulging in a unique vacation home like no other.",
      price: 99.99
    },
    {
      ownerId: 3,
      address: '777 Red Street',
      city: 'San Anita',
      state: 'Texas',
      country: 'United States',
      lat: 34.1227199,
      lng: 21.1332792,
      name: 'Ski-In, Ski-Out Chalet',
      description: "Ideal for winter sports enthusiasts, this chalet provides direct access to the slopes for a ski adventure. Ski in and out, warm up by the fire, and relish a cozy retreat after a day on the slopes.",
      price: 49.99
    },
    {
      ownerId: 3,
      address: '112 Yellow Street',
      city: 'Los Angeles',
      state: 'Texas',
      country: 'United States',
      lat: 44.1722299,
      lng: 33.1990092,
      name: 'Elegant Wine Country Villa',
      description: "Experience the ultimate wine-tasting adventure from this luxurious villa nestled in a renowned wine region. Savor exquisite wines, tour vineyards, and relax in elegance in the heart of wine country.",
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
