'use strict';

var test = require('tape');
var init = require('../example/server.js');
var config = require('../config/load-config.js');

test('Get all the people', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      console.log('error initialise server', err);
      return t.fail();
    }

    server.inject({
      method: 'GET',
      url: '/getbyemail'
    }, function (res) {
      t.equal(JSON.parse(res.payload).length, 1, 'Get a unique person')
      t.equal(JSON.parse(res.payload)[0].first_name, 'Bob', 'The person is Bob');
      t.end();
      pool.end()
      server.stop()
    });
  });
});