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
      name: 'Red',
      description: "Welcome to my Star Wars-themed Airbnb! As your host, I'll guide you through an immersive experience in a galaxy far, far away.",
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
      name: 'Yellow',
      description: "Step into the cantina of my Star Wars-themed Airbnb, where you'll be greeted by the vibrant and diverse atmosphere of the galaxy.",
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
      name: 'Blue',
      description: "Calling all Jedi and Sith! Prepare to embark on an unforgettable adventure in my Star Wars-inspired Airbnb.",
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
      name: 'Green',
      description: "Welcome to your own private starship! My Star Wars-themed Airbnb offers a unique experience where you can stay in a replica of the Millennium Falcon.",
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
      name: 'White',
      description: "Feel like royalty in my Star Wars-inspired palace! The grandeur and elegance of Naboo are replicated in every detail of this Airbnb.",
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
      name: 'Purple',
      description: "Looking for an otherworldly retreat? Look no further than my Jedi Temple-inspired Airbnb.",
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
      name: 'Cyan',
      description: "Attention, rebels and freedom fighters! This Rebel Alliance-themed Airbnb is your secret hideout in the heart of the galaxy.",
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
      name: 'Pink',
      description: "Welcome, scoundrels and smugglers, to my Star Wars underworld-inspired Airbnb!",
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
      name: 'Gold',
      description: "Join fellow guests for lively discussions about the Force or engage in lightsaber duels.",
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
