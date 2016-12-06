'use strict';

var test = require('tape');
var init = require('../../../example/server.js');
var config = require('../../../config/load-config.js');


// test org with/without primary user
// for now there is no difference, in the future we need to make any active linked primary users inactive
test('disable an active org', function (t) {
  init(config, function (err, server, pool) {
    if (err) return t.fail('error initialising server');

    server.inject({
      method: 'GET',
      url: '/orgsToggleActive?id=1'
    }, function (res) {

      t.deepEqual(res.result, [], 'successful disabling of org returns an empty array');

      server.inject({
        method: 'GET',
        url: '/orgsGetDetails?id=1'
      }, function (res) {
        t.ok(!res.result.org.active, 'the toggle active function has disabled the previously active org');

        t.end();
        pool.end()
        server.stop()
      });
    });
  });
});



// test enabling org
test('enable an inactive org', function (t) {
  init(config, function (err, server, pool) {
    if (err) return t.fail('error initialising server');

    server.inject({
      method: 'GET',
      url: '/orgsToggleActive?id=8'
    }, function (res) {

      t.deepEqual(res.result, [], 'successful enabling of org returns an array');

      server.inject({
        method: 'GET',
        url: '/orgsGetDetails?id=8'
      }, function (res) {
        t.ok(res.result.org.active, 'the toggle active function has enabled the previously inactive org');

        t.end();
        pool.end()
        server.stop()
      });
    });
  });
});


// test disbable org with wrong id -> error?
test('enable an inactive org', function (t) {
  init(config, function (err, server, pool) {
    if (err) return t.fail('error initialising server');

    server.inject({
      method: 'GET',
      url: '/orgsToggleActive?id=10000'
    }, function (res) {

      t.equal(res.statusCode, 404, 'Update an organisation that doest exist returns a 404');


      t.end();
      pool.end()
      server.stop()
    });
  });
});
