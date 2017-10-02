'use strict';

var test = require('tape');
var init = require('../../../example/server.js');
var config = require('../../../config/load-config.js');

test('search for oganisations containing searchTerm', function (t) {
  init(config, function (err, server, pool) {
    server.inject({ url: '/peopleSearch?searchTerm=sam roger' }, function (res) {
      t.equal(res.result[0].first_name, 'Sam', 'Sam is found');
      t.equal(res.result[0].last_name, 'Roger', 'and is last name is Roger');

      t.end();
      pool.end();
      server.stop();
    });
  });
});
