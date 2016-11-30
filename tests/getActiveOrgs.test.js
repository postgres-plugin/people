'use strict';

var test = require('tape');
var init = require('../example/server.js');
var config = require('../config/load-config.js');

test('Get all the active organisations', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      console.log('error initialise server', err);
      return t.fail();
    }

    server.inject({
      method: 'GET',
      url: '/getActiveOrgs'
    }, function (res) {
      var json = JSON.parse(res.payload)
      var expected = {
        id: 1,
        name: "Apple AAAA",
        logo_url: "https://www.google.co.uk/imgres?iitter.com%2Fcirculareconomy&docid=LnflHf1c&uact=8",
        mission_statement: "Change the economy",
        active: true
      };
      var appleOrg = res.result.filter(function (org) { return org.name === 'Apple AAAA'; })[0];
      t.ok(res.result.length > 3, 'There are more than 3 active orgs');
      t.deepEqual(appleOrg, expected, 'The org retreived is correct');
      t.end();
      pool.end()
      server.stop()
    });
  });
});
