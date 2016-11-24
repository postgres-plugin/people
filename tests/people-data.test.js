'use strict';

var test = require('tape');
var peopleData = require('../lib/fixtures/people-data.js');

test('Convert array of people to sql query', function (t) {
  var people = [
    {
      first_name: 'bob',
      last_name: 'bobby',
      user_type: 'admin',
      email: 'bob.bobby@bob.com',
      phone: '007',
      password: '123pwd',
      org_id: 1,
      job_title: 'user',
      last_login: 1479491066104,
      active: true
    }
  ];
  var query = peopleData(people);
  var expected = "INSERT INTO people "
    + "(first_name, last_name, user_type, email, phone, password, org_id, job_title, last_login, active)"
    + " VALUES "
    + "('bob', 'bobby', 'admin', 'bob.bobby@bob.com', '007', '123pwd', 1, 'user', 1479491066104, true);";

  t.equal(query, expected, 'Query to add people is ok');
  t.end();
});
