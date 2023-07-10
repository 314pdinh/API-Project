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
   options.tableName = 'ReviewImages';
   await queryInterface.bulkInsert(options, [
    {
      reviewId: 1,
      url: 'https://fastly.picsum.photos/id/806/200/300.jpg?hmac=IA-MNmLr1ua-cWJTayRkIMVB9ZU-DrSrJUB_8gi-Xpw'
    },
    {
      reviewId: 2,
      url: 'https://fastly.picsum.photos/id/1038/200/300.jpg?hmac=YkU1czWdP8PVibbjnh2YFlQZVnacHSntbpt41mgiXGU'
    },
    {
      reviewId: 3,
      url: 'https://fastly.picsum.photos/id/827/200/300.jpg?hmac=0Q7y5JGXuxSXgO7VUvdNhXC4yoAupOJiKmRS9RoPqs8'
    },
    {
      reviewId: 4,
      url: 'https://fastly.picsum.photos/id/36/4179/2790.jpg?hmac=OCuYYm0PkDCMwxWhrtoSefG5UDir4O0XCcR2x-aSPjs'
    },
    {
      reviewId: 5,
      url: 'https://fastly.picsum.photos/id/46/3264/2448.jpg?hmac=ZHE8nk-Q9uRp4MxgKNvN7V7pYFvA-9BCv99ltY3HBv4'
    },
    {
      reviewId: 6,
      url: 'https://fastly.picsum.photos/id/136/200/300.jpg?hmac=vOFG2QkF3OUbTp5DRbf7w58YCDVrvf_g5aPFxxTucpU'
    },
    {
      reviewId: 7,
      url: 'https://fastly.picsum.photos/id/668/200/300.jpg?hmac=E7YE9NQG89nCsmW1hc-1nACBZTj9ll8IiXS65WjdD28'
    },
    {
      reviewId: 8,
      url: 'https://fastly.picsum.photos/id/1068/200/300.jpg?hmac=ICIwYXRGTpDxBPZAI7V8YxGtBBanV8Dfbe_DLNKtYcE'
    },
    {
      reviewId: 9,
      url: 'https://fastly.picsum.photos/id/974/200/300.jpg?hmac=QEuRqsjG8spkqu72dWfkl4m-kSl5p-CEfHgx9dnnZLo'
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
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
    }, {})
  }
};
