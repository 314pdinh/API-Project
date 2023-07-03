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
    options.tableName = 'SpotImages'
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://fastly.picsum.photos/id/195/200/300.jpg?hmac=4jGQkshsI0i2q2zt0L5AnB3c8yyqVBkmkYR0zDKIpRQ',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://fastly.picsum.photos/id/433/200/300.jpg?hmac=Y75_deyseM49Q8smDAbeRflgTmOchUngpd-QeDllW0g',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://fastly.picsum.photos/id/565/200/300.jpg?hmac=Ho0T-TCTMRX_uDDGzaLhGzTmukSZdDjpGZJTbL0NY3k',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://fastly.picsum.photos/id/16/200/300.jpg?hmac=k64O1qCMBhaU0Ep_qML5_xDxqLVR1MhNm8VMqgdAsxA',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://fastly.picsum.photos/id/29/4000/2670.jpg?hmac=rCbRAl24FzrSzwlR5tL-Aqzyu5tX_PA95VJtnUXegGU',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://fastly.picsum.photos/id/716/200/300.jpg?hmac=qbNS_afUKsp_nyvuAAcK8T7OxOtMoqJvLIeaK-jirsU',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://fastly.picsum.photos/id/268/200/300.jpg?hmac=M1JKzVXjrhIffE66T4sLediL7lhGmvS2rNr8pW2JipE',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://fastly.picsum.photos/id/204/200/300.jpg?hmac=XxKpmfmEwzuLIP4_ji37Ql6leTx-j6LTtl8wNK3JTYY',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://fastly.picsum.photos/id/25/5000/3333.jpg?hmac=yCz9LeSs-i72Ru0YvvpsoECnCTxZjzGde805gWrAHkM',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://fastly.picsum.photos/id/247/200/300.jpg?hmac=DOAWkFIrJUIvEj0t5qAsGiVgyTn8_e8EicBaXPCQge8',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://fastly.picsum.photos/id/870/200/300.jpg?hmac=JX9iOiKD1A168ozbMTARKt6OKYtgsGx9GaBC8tX7oBg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://fastly.picsum.photos/id/872/200/300.jpg?hmac=ZO8BvamVelLddwqo7mHSnq6o6uXwPb9r41i4KuJTVdo',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://fastly.picsum.photos/id/239/200/300.jpg?hmac=jBV5mUiY1RXDAmu4rQXOdWeutyztlxqFSOVpnJ-QUb8',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://fastly.picsum.photos/id/141/200/300.jpg?hmac=d8Mh3TnTbeViVLDauKiTRsNX8KAY5RGDbXDwEuecPko',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://fastly.picsum.photos/id/907/200/300.jpg?hmac=BYvJHklGn1KzEhHiZTkbQtFiRXUET5zYdLLKS6RXF3I',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://fastly.picsum.photos/id/108/200/300.jpg?hmac=66ukSMLRNm61ayt092vMAdSgvIRE5opr1Dj3kxCkC2c',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://fastly.picsum.photos/id/381/200/300.jpg?hmac=DHcGsLBoQPJC-_rudxS4AdZuSE9UoOFP2U2v2veUAok',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://fastly.picsum.photos/id/690/200/300.jpg?hmac=YX9nONyDZ_zuGZ5wLOen_mxLWVHEsjpkADU43laON4M',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://fastly.picsum.photos/id/606/200/300.jpg?hmac=BRE2ZQWvR5ntz52bw_Js0wWKmc4kKVAAppUz4_xfewo',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://fastly.picsum.photos/id/566/200/300.jpg?hmac=gDpaVMLNupk7AufUDLFHttohsJ9-C17P7L-QKsVgUQU',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://fastly.picsum.photos/id/338/200/300.jpg?hmac=rE5P3WDLKY1VMpd9y_FLo_OKhTzG4_3zCbGjKvgOL5w',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://fastly.picsum.photos/id/432/200/300.jpg?hmac=S0muAtaN6T0PXbBlf5O-UL0chTPM6i9FReOIs0IJlDU',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://fastly.picsum.photos/id/412/200/300.jpg?hmac=xn1StiBtQbop1HtnoV2rRyhbONcD88TTDGhmRBa2fso',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://fastly.picsum.photos/id/64/200/300.jpg?hmac=9MtSCC-H4DQRFtYARRhBDmbZhrJlRQJ2NQLowTY7A-s',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://fastly.picsum.photos/id/431/200/300.jpg?hmac=aUpIWBq8svIaK2ruTnNG-BZuvcDsK9Mr9PuJuYAYEQ0',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://fastly.picsum.photos/id/933/200/300.jpg?hmac=8zdipGWKGkHz8wyA9J63P3fzghuUL9wqV5Y34b8mLTI',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://fastly.picsum.photos/id/10/200/300.jpg?hmac=94QiqvBcKJMHpneU69KYg2pky8aZ6iBzKrAuhSUBB9s',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://fastly.picsum.photos/id/847/200/300.jpg?hmac=c59lDNOau0hCfCBs141cA-vqX8QIRiqaVEnT3tRrDe0',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://fastly.picsum.photos/id/818/200/300.jpg?hmac=lE_Le7TxnELgojCX97DVlE9CLlZJWqnfbaQR3Chjstw',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://fastly.picsum.photos/id/768/200/300.jpg?hmac=lFX2oZVTUayugh_YZQ5q6uoXJFYaOJz3d2_GLaIW2aU',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://fastly.picsum.photos/id/365/200/300.jpg?hmac=n_4DxqK0o938eabBZRnEywWtPwgF2MKoTfnRmJ7vlKQ',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://fastly.picsum.photos/id/906/200/300.jpg?hmac=7sarKOMVDlgOBTc6eUDUf0M4S-M-4jF0X0uix_sMALU',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://fastly.picsum.photos/id/447/200/300.jpg?hmac=WubV-ZWbMgXijt9RLYedmkiaSer2IFiVD7xek928gC8',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://fastly.picsum.photos/id/365/200/300.jpg?hmac=n_4DxqK0o938eabBZRnEywWtPwgF2MKoTfnRmJ7vlKQ',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://fastly.picsum.photos/id/155/200/300.jpg?hmac=nG5WHfEXcJmld5FbH0N9bGciE9a57S0bgIHHTpxag7o',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://fastly.picsum.photos/id/840/200/300.jpg?hmac=Z8Mc1xk7GaQHQ1hkPTK4cY0dYIxDKGBCHrgyaDqE0u0',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://fastly.picsum.photos/id/808/200/300.jpg?hmac=Kyj9_KH7mvVdj6C03HH9933R2yKWSwQHGtqkeaTLCAM',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://fastly.picsum.photos/id/159/200/300.jpg?hmac=CC6862WSVsX6F74hcV30UzS4czPi0LO6zPJDaEaQeFU',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://fastly.picsum.photos/id/642/200/300.jpg?hmac=P8pCy5u7t4JlHkwIUFsWxnCfi2bWmYGey75V_299YPg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://fastly.picsum.photos/id/547/200/300.jpg?hmac=O1sHSqamP2AYNG_ADzB7uKiGjh_fmg-Xq4v2KEapg_k',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://fastly.picsum.photos/id/227/200/300.jpg?hmac=t3Ir7I6CJr-OrWOq4QVsRQTjpp03ce7vtDA3-NLdm-c',
        preview: true
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
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
    }, {})
  }
};
