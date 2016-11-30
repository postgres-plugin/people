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
      url: '/peopleGetBy?column=email&value=sa@ro.co'
    }, function (res) {
      t.equal(res.result.length, 1, 'Get a unique person')
      t.equal(res.result[0].first_name, 'Sally', 'The person is Sally');
      t.end();
      pool.end()
      server.stop()
    });
  });
});
