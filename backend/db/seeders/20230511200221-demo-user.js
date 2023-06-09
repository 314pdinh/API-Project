'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users';
    await queryInterface.bulkInsert(options, [
      {
        firstName: 'Dwayne',
        lastName: 'Johnson',
        email: 'johnson@gmail.com',
        username: 'TheRock',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        firstName: 'Chris',
        lastName: 'Evans',
        email: 'chris@gmail.com',
        username: 'Capt',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Robert',
        lastName: 'Downey Jr.',
        email: 'downey@gmail.com',
        username: 'IronMan',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['TheRock', 'Capt', 'IronMan'] }
    }, {});
  }
};