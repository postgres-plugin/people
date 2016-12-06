'use strict';

var test = require('tape');
var init = require('../../../example/server.js');
var config = require('../../../config/load-config.js');

// test endpoint
test('add organisation function', function (t) {
  init(config, function (err, server, pool) {
    if (err) return t.fail('error initialising server');

    var org = {
      name: 'Simon',
      logo_url: 'www.dunkendoughnuts.com'
    }

    server.inject({
      method: 'POST',
      url: '/orgsAdd',
      payload: org
    }, function (res) {

      t.deepEqual(res.result, [], 'successful add org query returns an array');

      server.inject({
        method: 'GET',
        url: '/orgsGetByTag'
      }, function (resOrgs) {
        var orgMatch = resOrgs.result.orgs.filter(function (org) {
          return org.name === 'Simon';
        })
        t.equal(orgMatch.length, 1, 'The org is saved');

        t.end();
        pool.end()
        server.stop()
      });
    });
  });
});

// test endpoint
test('add organisation when given name only', function (t) {
  init(config, function (err, server, pool) {
    if (err) return t.fail('error initialising server');

    var org = {
      name: 'Beds Express'
    }

    server.inject({
      method: 'POST',
      url: '/orgsAdd',
      payload: org
    }, function (res) {

      t.deepEqual(res.result, [], 'successful add org query returns an array');

      server.inject({
        method: 'GET',
        url: '/orgsGetByTag'
      }, function (resOrgs) {
        var orgMatch = resOrgs.result.orgs.filter(function (org) {
          return org.name === 'Beds Express';
        })
        t.equal(orgMatch.length, 1, 'The org is saved');

        t.end();
        pool.end()
        server.stop()
      });
    });
  });
});
