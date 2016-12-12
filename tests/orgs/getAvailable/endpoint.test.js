'use strict';

var test = require('tape');
var init = require('../../../example/server.js');
var config = require('../../../config/load-config.js');

// test endpoint
test('get all unlinked and active orgs for the dropdown', function (t) {
  init(config, function (err, server, pool) {
    server.inject({ url: '/orgsGetAvailable' }, function (res) {
      // currently the mock data doesn't have any active and unlinked organisations
      t.equal(res.payload, '[]', 'no orgs are available in the current set of mock data');
      t.end();
      pool.end();
      server.stop();
    });
  });
});
