'use strict';

var test = require('tape');
var init = require('../example/server.js');
var config = require('../config/load-config.js');

test('Add an organisation', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      console.log('error initialise server', err);
      return t.fail();
    }

    server.inject({
      method: 'GET',
      url: '/addOrgName/aNewOrg'
    }, function (res) {
      server.inject({
        method: 'GET',
        url: '/getActiveOrgs'
      }, function (resOrgs) {
        t.equal(JSON.parse(resOrgs.payload)[0].name, 'aNewOrg', 'The org is saved');
        t.end();
        pool.end()
        server.stop()
      })
    });
  });
});