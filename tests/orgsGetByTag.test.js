'use strict';

var test = require('tape');
var init = require('../example/server.js');
var config = require('../config/load-config.js');

test('Get all active and inactive organisations', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      console.log('error initialise server', err);
      return t.fail();
    }

    server.inject({
      method: 'GET',
      url: '/orgsGetByTag'
    }, function (res) {
      var expected = [
        'Apple AAAA',
        'Asda',
        'Charcoal',
        'Coca Cola',
        'Co-op Group',
        'dwyl',
        'EMF',
        'Fanta',
      ];
      expected.forEach(function (org, index) {
        var regexp = new RegExp(org, 'g');
        t.ok(res.payload.match(regexp), 'org name ' + org + ' displays as expected');
        if (index === expected.length - 1) {
          t.end();
          pool.end()
          server.stop()
        }
      });
    });
  });
});

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
      var expected = [
        'Apple AAAA',
        // 'Asda', >> Marked as inactive
        'Charcoal',
        // 'Coca Cola', >> Marked as inactive
        'Co-op Group',
        'dwyl',
        'EMF',
        // 'Fanta', >> Marked as inactive
      ];
      expected.forEach(function (org, index) {
        var regexp = new RegExp(org, 'g');
        t.ok(res.payload.match(regexp), 'org name ' + org + ' displays as expected');
        if (index === expected.length - 1) {
          t.end();
          pool.end()
          server.stop()
        }
      });
    });
  });
});

test('Get all organisations associated with a tag', function (t) {
  var tagId = 69;
  init(config, function (err, server, pool) {
    if (err) {
      console.log('error initialise server', err);
      return t.fail();
    }

    server.inject({
      method: 'GET',
      url: '/orgsGetByTag?tags=' + tagId
    }, function (res) {
      var expected = {
        filter_tag: 'Design for disassembly',
        orgs: [{
          id: 6,
          name: 'Asda',
          logo_url: 'https://www.google.co.uk/imgres?iitter.com%2Fcirculareconomy&docid=LnflHf1c&uact=8',
          active: false
        }, {
          id: 5,
          name: 'Co-op Group',
          logo_url: 'https://www.google.co.uk/imgres?iitter.com%2Fcirculareconomy&docid=LnflHf1c&uact=8',
          active: true
        }, {
          id: 4,
          name: 'EMF',
          logo_url: 'https://www.google.co.uk/imgres?iitter.com%2Fcirculareconomy&docid=LnflHf1c&uact=8',
          active: true
        }]
      };
      t.deepEqual(res.result, expected, 'active and inactive orgs associated with tag ' + tagId + 'displayed')
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
      var expected = [{
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

test('When no orgs are found to match a specific tag', function (t) {
  var tagId = 2;
  init(config, function (err, server, pool) {
    if (err) {
      console.log('error initialise server', err);
      return t.fail();
    }

    server.inject({
      method: 'GET',
      url: '/orgsGetByTag?tags=' + tagId
    }, function (res) {
      var expected = {
        filter_tag: 'Corporate',
        orgs: [{
          id: null,
          name: null,
          logo_url: null,
          active: null
        }]
      };
      t.deepEqual(res.result, expected, 'No orgs but tag name retreived');
      t.end();
      pool.end()
      server.stop()
    });
  });
});

test('When an unexpected tagID is used to search for matching orgs', function (t) {
  var tagId = 208125;
  init(config, function (err, server, pool) {
    if (err) {
      console.log('error initialise server', err);
      return t.fail();
    }

    server.inject({
      method: 'GET',
      url: '/orgsGetByTag?tags=' + tagId
    }, function (res) {
      t.ok(res, null, 'nothing returned');
      t.end();
      pool.end()
      server.stop()
    });
  });
});
