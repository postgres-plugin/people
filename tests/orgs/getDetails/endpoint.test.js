'use strict';

var test = require('tape');
var init = require('../../../example/server.js');
var config = require('../../../config/load-config.js');

// test endpoint
test('get org details for profile view, orgs.getDetails', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      console.log('error initialise server', err);
      return t.fail();
    }

    server.inject({
      method: 'GET',
      url: '/orgsGetDetails?id=1'
    }, function (res) {
      var ob = res.result;

      t.equal(ob.org.name, 'Apple AAAA', 'Gets the correct org');
      t.deepEqual(Object.keys(ob.org), ['id', 'name', 'logo_url', 'mission_statement', 'tags'], 'Gets the correct keys for the org');
      t.equal(ob.primary.first_name, 'Sally', 'Gets the correct primary user');
      t.deepEqual(Object.keys(ob.primary), [ 'first_name', 'last_name', 'id', 'phone', 'email', 'job_title'], 'Gets the correct keys for the org');
      t.deepEqual(Object.keys(ob.challenges[0]), [ 'id', 'title', 'description', 'tags'], 'Gets the correct keys for the challenges');
      t.equal(ob.challenges.length, 2, 'Gets the correct number of challenges for org');
      t.equal(ob.challenges[0].title, 'Challenge Number 2', 'Gets the correct challenge for org');
      t.end();
      pool.end()
      server.stop()
    });
  });
});
