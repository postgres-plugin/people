'use strict';

var test = require('tape');
var init = require('../../../example/server.js');
var config = require('../../../config/load-config.js');

var id = 1;
var timestamp = 1509706672;

function updateTimestamp (uid, timestamp) {
  return {
    method: 'POST',
    url: '/updateLastLogin?id=' + uid +'&timestamp=' + timestamp
  };
}

function checkTimestamp (uid) {
  return {
    method: 'GET',
    url: '/peopleGetById?id=' + uid
  };
}

test('Update last login timestamp', function (t) {
  init(config, function (err, server, pool) {
    if (err) return t.fail('error initialising server');

    server.inject(updateTimestamp(id, timestamp), function (res) {
      server.inject(checkTimestamp(id), function (res) {
        t.equal(res.result[0].last_login, timestamp.toString(), 'timestamp updated');
        t.end();
        pool.end()
        server.stop()
      });
    });
  });
});
