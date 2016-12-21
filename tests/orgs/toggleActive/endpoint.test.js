'use strict';

var test = require('tape');
var init = require('../../../example/server.js');
var config = require('../../../config/load-config.js');

function orgsToggleActive (id) {
  return {
    method: 'GET',
    url: '/orgsToggleActive?id=' + id
  }
}

function orgDetails (id) {
  return {
    method: 'GET',
    url: '/orgsGetDetails?id=' + id
  }
}

function userDetails (id) {
  return {
    method: 'GET',
    url: '/peopleGetById?id=' + id
  }
}

var allUsers = {
  method: 'GET',
  url: '/people'
}

// test active org with active primary user
test('disable an active org with active primary user', function (t) {
  var orgId = 1;
  var userId = 3;
  init(config, function (err, server, pool) {
    if (err) return t.fail('error initialising server');

    server.inject(orgDetails(orgId), function (res) {
      t.ok(
        res.result.org.active,
        'the org is active to begin with'
      );
      server.inject(userDetails(userId), function (res) {
        t.ok(
          res.result[0].active,
          'the user is active to begin with'
        );
        server.inject(orgsToggleActive(orgId), function (res) {
          t.deepEqual(
            res.result,
            [],
            'successful disabling of org returns an empty array'
          );
          server.inject(orgDetails(orgId), function (res) {
            t.ok(
              !res.result.org.active,
              'previously active org has been disabled'
            );
            server.inject(userDetails(userId), function (res) {
              t.ok(
                !res.result[0].active,
                'previously active user has also been disabled'
              );
              t.end();
              pool.end()
              server.stop()
            });
          });
        });
      });
    });
  });
});


// test inactive org with no primary user
test('toggle an inactive org with no primary user', function (t) {
  var orgId = 7;
  var preToggleUsers;

  init(config, function (err, server, pool) {
    if (err) return t.fail('error initialising server');

    server.inject(orgDetails(orgId), function (res) {
      t.ok(
        !res.result.org.active,
        'the org is inactive to begin with'
      );
      server.inject(allUsers, function (res) {
        preToggleUsers = res.result;
        server.inject(orgsToggleActive(orgId), function (res) {
          t.deepEqual(
            res.result,
            [],
            'successful disabling of org returns an empty array'
          );
          server.inject(orgDetails(orgId), function (res) {
            t.ok(
              res.result.org.active,
              'previously inactive org has been enabled'
            );
            server.inject(allUsers, function (res) {
              t.deepEqual(
                res.result,
                preToggleUsers,
                'none of the users have been affected by change in org activity'
              );
              t.end();
              pool.end()
              server.stop()
            });
          });
        });
      });
    });
  });
});


// test inactive org with active user
test('enable an inactive org with an active primary user', function (t) {
  var orgId = 8;
  var userId = 11;
  init(config, function (err, server, pool) {
    if (err) return t.fail('error initialising server');

    server.inject(orgDetails(orgId), function (res) {
      t.ok(
        !res.result.org.active,
        'the org is inactive to begin with'
      );
      server.inject(userDetails(userId), function (res) {
        t.ok(
          res.result[0].active,
          'the user is active to begin with'
        );
        server.inject(orgsToggleActive(orgId), function (res) {
          t.deepEqual(
            res.result,
            [],
            'successful enabling of org returns an empty array'
          );
          server.inject(orgDetails(orgId), function (res) {
            t.ok(
              res.result.org.active,
              'previously inactive org is now enabled'
            );
            server.inject(userDetails(userId), function (res) {
              t.ok(
                !res.result[0].active,
                'previously active user is not disabled'
              );
              t.end();
              pool.end()
              server.stop()
            });
          });
        });
      });
    });
  });
});

// test disable org with wrong id -> error?
test('toggle a non existent org', function (t) {
  var orgId = 10000000;
  init(config, function (err, server, pool) {
    if (err) return t.fail('error initialising server');

    server.inject(orgsToggleActive(orgId), function (res) {
      t.equal(
        res.statusCode,
        404,
        'Update an organisation that doest exist returns a 404'
      );
      t.end();
      pool.end()
      server.stop()
    });
  });
});
