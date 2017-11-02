'use strict';

var test = require('tape');
var init = require('../../../example/server.js');
var config = require('../../../config/load-config.js');

test('search for people by organisation id', function (t) {
  init(config, function (err, server, pool) {
    server.inject({ url: '/peopleGetByOrgId?orgId=1' }, function (res) {
      t.equal(res.result.length, 3, 'the org 1 has 3 people')
      t.end();
      pool.end();
      server.stop();
    });
  });
});
