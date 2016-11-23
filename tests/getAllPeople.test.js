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
      url: '/people'
    }, function (res) {
      t.equal(JSON.parse(res.payload).length, 2, 'Return 2 users');
      t.end();
      pool.end()
      server.stop()
    });
  });
});
