'use strict';

var test = require('tape');
var getUser = require('../lib/queries/getUser.js');
var userId = 1;

var expectedQuery = 'SELECT id, first_name, last_name, user_type, email,'
  + ' phone, org_id, job_title, last_login, active '
  + 'FROM people WHERE id = 1;';


test('getUser query string', function (t) {
  t.equal(getUser(userId), expectedQuery,
    'getUser function takes a number and outputs a valid query string');
  t.end();
});
