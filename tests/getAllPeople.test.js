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

      t.ok(res.result.length > 5, 'Return at least 6 users');
      t.end();
      pool.end()
      server.stop()
    });
  });
});
