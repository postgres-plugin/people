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
      url: '/updateOrg?id=10000',
      payload: orgObj
    }, function (res) {

      t.equal(res.statusCode, 404, 'Bad org id returns 404 error');

      t.end();
      pool.end();
      server.stop();
    });
  });
});


// test endpoint
test('update to org with exactly the same info that it already has: --> ' + __filename, function (t) {
  init(config, function (err, server, pool) {
    var orgObj = {
      name: 'Apple AAAA',
      logo_url: 'https://www.google.co.uk/imgres?iitter.com%2Fcirculareconomy&docid=LnflHf1c&uact=8',
      mission_statement: 'Change the economy'
    };

    server.inject({
      method: 'POST',
      url: '/updateOrg?id=1',
      payload: orgObj
    }, function (res) {

      t.notEqual(res.statusCode, 404, 'update org details with unchanged details does not return a 404');

      t.end();
      pool.end();
      server.stop();
    });
  });
});
