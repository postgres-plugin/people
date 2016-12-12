'use strict';

var test = require('tape');
var init = require('../../../example/server.js');
var config = require('../../../config/load-config.js');

test('successsful update to password with account activated false', function (t) {
  init(config, function (err, server, pool) {
    t.ok(!err, 'error starting server: ' + err);

    server.inject({ url: '/peopleAddPassword?id=8&password=Santaclause' }, function (res) {

      var expected = [{ returning_user: false, org_id: 6 }];

      t.deepEqual(res.result, expected, 'successful update to password returns org id');
      t.end();
      pool.end();
      server.stop();
    });
  });
});


// useful for the forgot password feature that is likely to be added
test('successsful update to password with account activated true', function (t) {
  init(config, function (err, server, pool) {
    t.ok(!err, 'error starting server: ' + err);

    server.inject({ url: '/peopleAddPassword?id=3&password=Santaclause' }, function (res) {

      var expected = [{ returning_user: true, org_id: 1 }];

      t.deepEqual(res.result, expected, 'successful update to password if user has already activated an account still returns returns org id');
      t.end();
      pool.end();
      server.stop();
    });
  });
});


test('unsuccessful update to password with unrecognised user', function (t) {
  init(config, function (err, server, pool) {
    t.ok(!err, 'error starting server: ' + err);

    server.inject({ url: '/peopleAddPassword?id=30000&password=Santaclause' }, function (res) {

      t.deepEqual(res.payload, '[]', 'successful update to password if user has already activated an account still returns returns org id');
      t.end();
      pool.end();
      server.stop();
    });
  });
});
