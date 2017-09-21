'use strict';

var test = require('tape');
var init = require('../../../example/server.js');
var config = require('../../../config/load-config.js');
var people = require('ce100-mock-data').people;

test('Get all the people', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      console.log('error initialise server', err);
      return t.fail();
    }

    server.inject({
      method: 'GET',
      url: '/people'
    }, function (res) {
      t.ok(res.result[0].hasOwnProperty('org_id'));
      t.equal(res.result.length, people.length, 'Only returns active users');
      t.end();
      pool.end();
      server.stop();
    });
  });
});

test('Get active only people', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      console.log('error initialise server', err);
      return t.fail();
    }
    var activeNonAdmins = people.filter(function (p) {
      return p.active && p.user_type !== 'admin';
    }).length;

    server.inject({
      method: 'GET',
      url: '/people?active=true'
    }, function (res) {

      t.equal(res.result.length, activeNonAdmins, 'Only returns active users');
      t.end();
      pool.end();
      server.stop();
    });
  });
});
