'use strict';

var test = require('tape');
var init = require('../../../example/server.js');
var config = require('../../../config/load-config.js');
var people = require('../../../example/data/people.json');

test('successsful add user with orgnaisation', function (t) {
  init(config, function (err, server, pool) {
    t.ok(!err, 'error starting server: ' + err);

    var newUser = {
      first_name: 'Frank',
      last_name: 'Bruno',
      job_title: '',
      email: 'aa@hh.co',
      phone: '07444444444',
      user_type: 'primary',
      org_id: 6
    }

    var addUser = {
      method: 'POST',
      url: '/peopleAdd',
      payload: newUser
    }

    server.inject(addUser, function (res) {
      var expected = [{ id: people.length + 1, org_id: 6, org_name: 'Asda' }];

      t.deepEqual(res.result, expected, 'successful add user returns their id and org id');
      t.end();
      pool.end();
      server.stop();
    });
  });
});




test('successsful add user with orgnaisation', function (t) {
  init(config, function (err, server, pool) {
    t.ok(!err, 'error starting server: ' + err);

    var newUser = {
      first_name: 'Frank',
      last_name: 'Bruno',
      job_title: '',
      email: 'aa@hh.co',
      phone: '',
      user_type: 'primary',
      org_id: -1
    }

    var addUser = {
      method: 'POST',
      url: '/peopleAdd',
      payload: newUser
    }

    server.inject(addUser, function (res) {
      var expected = [{ id: people.length + 1, org_id: null, org_name: null }];

      t.deepEqual(res.result, expected, 'successful add user with no org returns the users id and null');
      t.end();
      pool.end();
      server.stop();
    });
  });
});

test('attempt to add user with non existent org', function (t) {
  init(config, function (err, server, pool) {
    t.ok(!err, 'error starting server: ' + err);

    var newUser = {
      first_name: 'Frank',
      last_name: 'Bruno',
      job_title: '',
      email: 'aa@hh.co',
      phone: '07444444444',
      user_type: 'primary',
      org_id: 100
    }

    var addUser = {
      method: 'POST',
      url: '/peopleAdd',
      payload: newUser
    }

    server.inject(addUser, function (res) {
      t.equal(res.statusCode, 500, 'if organisation is not recognised we get an error');
      t.end();
      pool.end();
      server.stop();
    });
  });
});
