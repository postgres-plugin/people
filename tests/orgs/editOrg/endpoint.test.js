'use strict';

var test = require('tape');
var init = require('../../../example/server.js');
var config = require('../../../config/load-config.js');

// test endpoint
test('successful update returns an empty array', function (t) {
  init(config, function (err, server, pool) {
    var orgObj = {
      name: 'Google',
      logo_url: 'www.google.co',
      mission_statement: 'Change the internet'
    };

    server.inject({
      method: 'POST',
      url: '/updateOrg?id=1',
      payload: orgObj
    }, function (res) {
      t.deepEqual(res.result, [], 'successful update returns an empty array');
      console.log(res.result);

      t.end();
      pool.end();
      server.stop();
    });
  });
});


// test endpoint
test('update to org that doesnt exist ', function (t) {
  init(config, function (err, server, pool) {
    var orgObj = {
      name: 'Google',
      logo_url: 'www.google.co',
      mission_statement: 'Change the internet'
    };

    server.inject({
      method: 'POST',
      url: '/updateOrg?id=100',
      payload: orgObj
    }, function (res) {
      console.log(res.result);
      t.deepEqual(res.result, [], 'successful update returns an empty array');

      t.end();
      pool.end();
      server.stop();
    });
  });
});
