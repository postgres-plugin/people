'use strict';

var test = require('tape');
var init = require('../../../example/server.js');
var config = require('../../../config/load-config.js');

var orgs = require('ce100-mock-data').organisations;

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
