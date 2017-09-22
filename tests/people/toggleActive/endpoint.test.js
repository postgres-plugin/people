'use strict';

var test = require('tape');
var init = require('../../../example/server.js');
var config = require('../../../config/load-config.js');

var activeUid = 3;
var inactiveUid = 9;

function toggleUser (uid) {
  return {
    method: 'POST',
    url: '/peopleToggleActive?id=' + uid
  };
}

function checkActivity (uid) {
  return {
    method: 'GET',
    url: '/peopleGetById?id=' + uid
  };
}

test('disable an active user', function (t) {
  init(config, function (err, server, pool) {
    if (err) return t.fail('error initialising server');

    server.inject(checkActivity(activeUid), function (res) {
      t.equal(res.result[0].active, true, 'user is originally active');
      server.inject(toggleUser(activeUid), function (res) {
        t.equal(res.payload, '[]', 'empty array signifies successful toggle');
        server.inject(checkActivity(activeUid), function (res) {
          t.equal(res.result[0].active, false, 'user has been deactivated');
          t.end();
          pool.end()
          server.stop()
        });
      });
    });
  });
});

test('enable an active user', function (t) {
  init(config, function (err, server, pool) {
    if (err) return t.fail('error initialising server');

    server.inject(checkActivity(inactiveUid), function (res) {
      t.equal(res.result[0].active, false, 'user is originally inactive');
      server.inject(toggleUser(inactiveUid), function (res) {
        t.equal(res.payload, '[]', 'empty array signifies successful toggle');
        server.inject(checkActivity(inactiveUid), function (res) {
          t.equal(res.result[0].active, true, 'user has been activated');
          t.end();
          pool.end()
          server.stop()
        });
      });
    });
  });
});
