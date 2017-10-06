'use strict';

var test = require('tape');
var init = require('../../../example/server.js');
var config = require('../../../config/load-config.js');

test('Get organistaion by id', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      console.log('error initialise server', err);
      return t.fail();
    }

    server.inject({
      method: 'GET',
      url: '/orgsGetById?id=1'
    }, function (res) {
      t.ok(res.result[0].org_name, 'Apple', 'Get organisation 1 ok');
      t.end();
      pool.end()
      server.stop()
    });
  });
});
