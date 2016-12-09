'use strict';

var test = require('tape');
var init = require('../../../example/server.js');
var config = require('../../../config/load-config.js');

// test endpoint
test('get org id 1 details for profile view, orgs.getDetails', function (t) {
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

      t.equal(ob.org.name, 'Apple', 'Gets the correct org');
      t.deepEqual(Object.keys(ob.org), ['id', 'name', 'logo_url', 'mission_statement', 'active', 'tags'], 'Gets the correct keys for the org');
      t.equal(ob.primary.first_name, 'Sally', 'Gets the correct primary user');
      t.deepEqual(Object.keys(ob.primary), [ 'first_name', 'last_name', 'id', 'phone', 'email', 'job_title'], 'Gets the correct keys for the org');
      t.deepEqual(Object.keys(ob.challenges[0]), [ 'id', 'title', 'description', 'tags'], 'Gets the correct keys for the challenges');
      t.equal(ob.challenges.length, 2, 'Gets the correct number of challenges for org');
      t.equal(ob.challenges[1].title, 'Challenge Number 2', 'Gets the correct challenge for org');
      t.end();
      pool.end();
      server.stop();
    });
  });
});


// test endpoint
test('get org id 2 details for profile view, orgs.getDetails', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      console.log('error initialise server', err);
      return t.fail();
    }

    server.inject({
      method: 'GET',
      url: '/orgsGetDetails?id=2'
    }, function (res) {
      var ob = res.result;
      var expectedOrg =
        {
          id: 2,
          name: "dwyl",
          logo_url: "https://www.google.co.uk/imgres?iitter.com%2Fcirculareconomy&docid=LnflHf1c&uact=8",
          mission_statement: "Do What You Love!",
          active: true,
          tags: []
        };
      var expectedPrimary =
        {
          first_name: "Ben",
          last_name: "Matthews",
          id: 4,
          phone: "07111111111",
          email: "be@ma.co",
          job_title: "Awesome"
        };
      var expectedChallenge0 =
        {
          id: 4,
          title: "Challenge Number 4",
          description: "Who should I...?",
          tags: [ { tag_id: 9,  tag_name: "Automotive and Transport Manufacturing" }
                , { tag_id: 11, tag_name: "Chemicals" }
                , { tag_id: 69, tag_name: "Design for disassembly" }
                , { tag_id: 60, tag_name: "Secondary education" }
                ]
        };
      var expectedChallenge1 =
        {
          id: 5,
          title: "Challenge Number 5",
          description: "How have...?",
          tags: []
        };


      t.deepEqual(ob.org, expectedOrg, 'Gets the correct org with id 2');
      t.deepEqual(ob.primary, expectedPrimary, 'Gets the correct primary user with org id 2');
      t.deepEqual(ob.challenges[0], expectedChallenge0, 'Gets the correct first challenge for org with id 2');
      t.deepEqual(ob.challenges[1], expectedChallenge1, 'Gets the correct second challenge for org with id 2');
      t.end();
      pool.end()
      server.stop()
    });
  });
});
