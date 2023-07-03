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
      review: "May the Force be with this Airbnb! A truly stellar experience from start to finish. The host was a Jedi Master of hospitality, and the accommodations were out of this galaxy. Five lightsabers up!",
      stars: 5
    },
    {
      spotId: 1,
      userId: 2,
      review: "This Airbnb was like stepping into the Millennium Falcon. It had all the amenities you could ask for, and the host was as wise as Yoda. A perfect five-star adventure!",
      stars: 5
    },
    {
      spotId: 1,
      userId: 3,
      review: "From Tatooine to Coruscant, this Airbnb was the perfect landing pad. The host was as charming as Han Solo, and the accommodations were as comfortable as Chewbacca's embrace. We'd give it six stars if we could!",
      stars: 5
    },
    {
      spotId: 2,
      userId: 2,
      review: "This Airbnb was a hidden rebel base of comfort and relaxation. The host was as rebellious as Princess Leia, and the accommodations were as cozy as an Ewok village. Five stars, and may the Force be with this incredible stay!",
      stars: 5
    },
    {
      spotId: 2,
      userId: 3,
      review: "This Airbnb was as grand as the Death Star. The host was as commanding as Darth Vader, and the accommodations were as impressive as the Death Star's superlaser. A powerfully five-star experience!",
      stars: 5
    },
    {
      spotId: 2,
      userId: 1,
      review: "Average stay in the Star Wars galaxy. Host could have been more attentive, and accommodations were okay. Three stars for a decent experience.",
      stars: 3
    },
    {
      spotId: 3,
      userId: 3,
      review: "Disappointing Star Wars-themed Airbnb. Host was unreliable, and accommodations were uninspiring. Three stars for a mediocre experience.",
      stars: 3
    },
    {
      spotId: 3,
      userId: 1,
      review: "Not worth it, felt like being hunted by the Ewoks",
      stars: 1
    },
    {
      spotId: 3,
      userId: 2,
      review: "Missed the mark for a Star Wars fan. Host lacked enthusiasm, and accommodations were ordinary. Three stars for a lukewarm experience.",
      stars: 1
    },
    {
      spotId: 4,
      userId: 1,
      review: "Almost like a stay in a galaxy far, far away. The host was friendly and responsive, and the accommodations had subtle nods to the Star Wars universe.",
      stars: 4
    },
    {
      spotId: 4,
      userId: 2,
      review: "Average Star Wars stay. Host lacked passion, and accommodations were ordinary. Three stars for a decent but unremarkable experience.",
      stars: 3
    },
    {
      spotId: 4,
      userId: 3,
      review: "A Star Wars dream come true! This Airbnb was like staying in the heart of the galaxy.",
      stars: 5
    },
    {
      spotId: 5,
      userId: 3,
      review: "A trip to the dark side has never been this enjoyable! This Airbnb was as impressive as Darth Vader's presence!",
      stars: 5
    },
    {
      spotId: 5,
      userId: 1,
      review: "The host was as charismatic as Emperor Palpatine, and the accommodations were as stylish as a Sith Lord's cloak. Five stars, and we embraced the power of the dark side!",
      stars: 5
    },
    {
      spotId: 6,
      userId: 1,
      review: "The accommodations were basic, leaving us wanting more. Three stars for a lackluster stay in a galaxy far, far away.",
      stars: 3
    },
    {
      spotId: 6,
      userId: 2,
      review: "Three stars for a mediocre experience that didn't capture the magic of the Star Wars universe.",
      stars: 3
    },
    {
      spotId: 7,
      userId: 2,
      review: "From broken lightsabers to malfunctioning droids, nothing seemed to work properly. One star for a disappointing and frustrating experience that felt like a trip to the dark side.",
      stars: 1
    },
    {
      spotId: 8,
      userId: 3,
      review: "The droid server malfunctioned!",
      stars: 2
    },
    {
      spotId: 8,
      userId: 1,
      review: "It was loud and nothing works, hyperdrive failed.",
      stars: 1
    },
    {
      spotId: 9,
      userId: 3,
      review: "C-3PO was of great assistance, the porgs were very playful!",
      stars: 5
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
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
    }, {})
  }
};
