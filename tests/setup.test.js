'use strict';

var test = require('tape');
var init = require('../example/server.js');
var config = require('../config/load-config.js')();


test('Server start ok', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      return t.fail();
    }

    return server.inject({ method: 'GET', url: '/' }, function (res) {
      t.equal(res.payload, '[]', 'server is up and running!');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});
