'use strict';

var test = require('tape');
var init = require('../../../example/server.js');
var config = require('../../../config/load-config.js');

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
        'Apple',
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
        'Apple',
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
  var expected = {
    filter: {
      id: 69,
      name: 'Design for disassembly'
    },
    orgs: [{
      id: 6,
      name: 'Asda',
      logo_url: null,
      active: true
    }, {
      id: 5,
      name: 'Co-op Group',
      logo_url: null,
      active: true
    }, {
      id: 4,
      name: 'EMF',
      logo_url: null,
      active: true
    }]
  };

  init(config, function (err, server, pool) {
    if (err) {
      console.log('error initialise server', err);
      return t.fail();
    }

    server.inject({
      method: 'GET',
      url: '/orgsGetByTag?tags=' + expected.filter.id
    }, function (res) {
      t.deepEqual(res.result, expected, 'active and inactive orgs associated with tag ' + expected.filter.id + ' displayed');
      t.end();
      pool.end()
      server.stop()
    });
  });
});

test('Get all the active organisations, associated with a specific tag', function (t) {
  var expected = {
    filter: {
      id: 69,
      name: 'Design for disassembly'
    },
    orgs: [{
      id: 6,
      name: 'Asda',
      logo_url: null,
      active: true
    },{
      id: 5,
      name: 'Co-op Group',
      logo_url: null,
      active: true
    }, {
      id: 4,
      name: 'EMF',
      logo_url: null,
      active: true
    }]
  };

  init(config, function (err, server, pool) {
    if (err) {
      console.log('error initialise server', err);
      return t.fail();
    }

    server.inject({
      method: 'GET',
      url: '/orgsGetByTag?active=true&tags=' + expected.filter.id
    }, function (res) {
      t.equal(res.result.orgs.length, 3, 'There are 3 active orgs associated to tagId ' + expected.filter.id);
      t.deepEqual(res.result.orgs, expected.orgs, 'The org retreived is correct');
      t.equal(res.result.filter.name, expected.filter.name, 'The query response has been correctly formatted');
      t.end();
      pool.end()
      server.stop()
    });
  });
});

test('When no orgs are found to match a specific tag', function (t) {
  var expected = {
    filter: {
      id: 2,
      name: 'Corporate'
    },
    orgs: []
  };
  init(config, function (err, server, pool) {
    if (err) {
      console.log('error initialise server', err);
      return t.fail();
    }

    server.inject({
      method: 'GET',
      url: '/orgsGetByTag?tags=' + expected.filter.id
    }, function (res) {
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
      t.equal(res.statusCode, 400, '400 statusCode returned')
      t.equal(res.result.message, 'invalid tag', 'error message returned');
      t.end();
      pool.end()
      server.stop()
    });
  });
});
