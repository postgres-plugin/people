// 'use strict';
//
// var test = require('tape');
// var init = require('../../../example/server.js');
// var config = require('../../../config/load-config.js');
//
// var update = {
//   first_name: 'Sally',
//   last_name: 'Robertson',
//   job_title: 'Chocolatier',
//   phone: '07111111111'
// };
//
// function editProfile (id ) {
//   return {
//     method: 'POST',
//     url: '/peopleEdit?id=' + id,
//     payload: update
//   };
// }
//
// test('Edit user profile', function (t) {
//   init(config, function (err, server, pool) {
//     if (err) {
//       console.log('error initialise server', err);
//       return t.fail();
//     }
//     server.inject(editProfile(3), function (res) {
//       t.equal(res.statusCode, 200, 'User found');
//       t.equal(res.payload, '[]', 'return an empty array');
//       t.end();
//       pool.end()
//       server.stop()
//     });
//   });
// });
//
// test('Attempt to edit non-existent user\'s profile', function (t) {
//   init(config, function (err, server, pool) {
//     if (err) {
//       console.log('error initialise server', err);
//       return t.fail();
//     }
//     server.inject(editProfile(5000), function (res) {
//       t.equal(res.statusCode, 500, 'Attempt to update a non existing user');
//       t.end();
//       pool.end()
//       server.stop()
//     });
//   });
// });
