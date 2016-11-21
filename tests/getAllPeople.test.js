'use strict';

var test = require('tape');
var init = require('../example/server.js');
var config = require('../config/load-config.js');
var createPeople = require('./helpers/create-people.js');
var resetPeople = require('./helpers/reset-people.js');

test('Get all the people', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      return t.fail();
    }

    return createPeople(pool, function (error) {
      t.ok(!error, 'no error when inserting people in table');
      server.inject({
        method: 'GET',
        url: '/people'
      }, function (res) {
        var expected = [
          {
            id: 1,
            first_name: 'bob',
            last_name: 'bobby',
            user_type: 'admin',
            email: 'bob.bobby@bob.com',
            phone: '007',
            org_id: null,
            job_title: null,
            last_login: null,
            active: true
          }
        ];

        t.deepEqual(JSON.parse(res.payload), expected, 'Get all users ok');
        t.end();
        server.stop();
        return resetPeople(pool, function (error) { //eslint-disable-line
          t.ok(!error, 'no error when inserting people in table');

          return pool.end();
        });
      });
    });
  });
});
