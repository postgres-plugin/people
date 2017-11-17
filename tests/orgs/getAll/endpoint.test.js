'use strict';

var test = require('tape');
var init = require('../../../example/server.js');
var config = require('../../../config/load-config.js');

test('Get all the organisations', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      console.log('error initialise server', err);
      return t.fail();
    }

    server.inject({
      method: 'GET',
      url: '/orgsGetAll'
    }, function (res) {
      t.ok(res.result[0].org_name, 'Apple', 'The first org is Apple');
      t.end();
      pool.end()
      server.stop()
    });
  });
});
