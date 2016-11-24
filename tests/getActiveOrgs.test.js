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
      var expected = [
        {
          "id": 1,
          "name": "MI6",
          "logo_url": "",
          "mission_statement": "do some stuff",
          "active": true
        }
      ];
      t.equal(json.length, 1, 'There is only 1 org');
      t.deepEqual(json, expected, 'The org retreived is correct');
      t.end();
      pool.end()
      server.stop()
    });
  });
});