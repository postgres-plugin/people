'use strict';

var test = require('tape');
var init = require('../example/server.js');
var config = require('../config/load-config.js');

test('Get all the active organisations', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      console.log('error initialise server', err);
      return t.fail();
    }

    server.inject({
      method: 'GET',
      url: '/orgsGetByTag?active=true'
    }, function (res) {
      var expected = {
        id: 1,
        name: "Apple AAAA",
        logo_url: "https://www.google.co.uk/imgres?iitter.com%2Fcirculareconomy&docid=LnflHf1c&uact=8",
        active: true
      };
      var appleOrg = res.result.orgs.filter(function (org) { return org.name === 'Apple AAAA'; })[0];
      t.ok(res.result.orgs.length > 3, 'There are more than 3 active orgs');
      t.deepEqual(appleOrg, expected, 'The org retreived is correct');
      t.end();
      pool.end()
      server.stop()
    });
  });
});

test('Get all the active organisations, associated with a specific tag', function (t) {
  var tagId = 69;
  init(config, function (err, server, pool) {
    if (err) {
      console.log('error initialise server', err);
      return t.fail();
    }

    server.inject({
      method: 'GET',
      url: '/orgsGetByTag?active=true&tags=' + tagId
    }, function (res) {
      var filter = 'Design for disassembly'
      var expected = [ {
        id: 5,
        name: 'Co-op Group',
        logo_url: 'https://www.google.co.uk/imgres?iitter.com%2Fcirculareconomy&docid=LnflHf1c&uact=8',
        active: true
      }, {
        id: 4,
        name: 'EMF',
        logo_url: 'https://www.google.co.uk/imgres?iitter.com%2Fcirculareconomy&docid=LnflHf1c&uact=8',
        active: true
      }];
      t.ok(res.result.orgs.length = 2, 'There are 2 active orgs associated to tagId ' + tagId);
      t.deepEqual(expected, res.result.orgs, 'The org retreived is correct');
      t.equal(filter, res.result.filter_tag, 'The query response has been correctly formatted');
      t.end();
      pool.end()
      server.stop()
    });
  });
});
