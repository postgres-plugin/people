'use strict';

var test = require('tape');
var init = require('../../../example/server.js');
var config = require('../../../config/load-config.js');

var orgs = require('../../../example/data/organisations.json');

// test endpoint
test('get all unlinked and active orgs for the dropdown', function (t) {
  init(config, function (err, server, pool) {
    server.inject({ url: '/orgsGetActive' }, function (res) {

      var numActiveOrgs = orgs.filter(function (org) { return org.active; }).length;
      t.equal(res.result.length, numActiveOrgs, 'Each active org is shown');

      var expectedOrgFormat = { name: 'Apple', id: 1, active_primary_user: 3 }
      t.deepEqual(res.result[0], expectedOrgFormat, 'The organisation has relevant info');

      t.end();
      pool.end();
      server.stop();
    });
  });
});
