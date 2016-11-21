'use strict';

var test = require('tape');
var init = require('../example/server.js');
var config = require('../config/load-config.js');

test('Server start without any error', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      return t.fail();
    }

    return pool.end(function () {
      server.stop(t.end);
    });
  });
});
