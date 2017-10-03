'use strict';

var test = require('tape');
var init = require('../../../example/server.js');
var config = require('../../../config/load-config.js');

// test endpoint
test('search for oganisations containing searchTerm', function (t) {
  init(config, function (err, server, pool) {
    server.inject({ url: '/orgsSearch?searchTerm=ppl' }, function (res) {
      t.equal(res.result.length, 1, 'Apple organisation found');

      t.end();
      pool.end();
      server.stop();
    });
  });
});

test('search for oganisations containing searchTerm on mission_statement', function (t) {
  init(config, function (err, server, pool) {
    server.inject({ url: '/orgsSearch?searchTerm=summer!' }, function (res) {
      t.equal(res.result[0].org_name, 'Charcoal', 'Charcoal has been found by its mission_statement');

      t.end();
      pool.end();
      server.stop();
    });
  });
});
