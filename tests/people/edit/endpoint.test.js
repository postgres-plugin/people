'use strict';

var test = require('tape');
var init = require('../../../example/server.js');
var config = require('../../../config/load-config.js');

// test endpoint
test('Edit user profile', function (t) {
  var update = {
    first_name: 'Sally',
    last_name: 'Robertson',
    job_title: 'Chocolatier',
    phone: '07111111111'
  };

  init(config, function (err, server, pool) {
    if (err) {
      console.log('error initialise server', err);
      return t.fail();
    }

    server.inject({
      method: 'POST',
      url: '/peopleEdit?id=3',
      payload: update
    }, function (res) {
      t.end();
      pool.end()
      server.stop()
    });
  });
});
