'use strict';

var test = require('tape');
var init = require('../../../example/server.js');
var config = require('../../../config/load-config.js');

test('Get tags linked to the org id 1', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      console.log('error initialise server', err);
      return t.fail();
    }

    server.inject({
      method: 'GET',
      url: '/orgsGetTags?id=1'
    }, function (res) {
      t.ok(res.result.length, 2, 'The organisation with id = 1 has two tags');
      t.end();
      pool.end()
      server.stop()
    });
  });
});
