'use strict';

var test = require('tape');
var init = require('../../../example/server.js');
var config = require('../../../config/load-config.js');

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
      t.ok(res.payload.indexOf('inactive') < 0, 'No inactive users');
      t.end();
      pool.end()
      server.stop()
    });
  });
});

test('Get active only people', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      console.log('error initialise server', err);
      return t.fail();
    }

    server.inject({
      method: 'GET',
      url: '/people?active=true'
    }, function (res) {
      t.equal(res.result.length, 9, 'Only returns active users');
      t.end();
      pool.end()
      server.stop()
    });
  });
});
