'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('profiles', [
      {
        name: 'Administrador General'
      },
      {
        name: 'Administrador Técnico'
      },
      {
        name: 'Pre Administrador'
      }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {});
  }
};
