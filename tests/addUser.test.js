'use strict';

var test = require('tape');
var addUser = require('../lib/queries/addUser.js');
var userObj = {
  first_name: 'J',
  last_name: 'M',
  user_type: 'admin',
  email: 'ja@mu.co',
  phone: '',
  password: 'Hello1',
  org_id: null,
  job_title: 'Developer',
  last_login: '',
  active: true
};

var query = 'INSERT INTO people (
  first_name, last_name, user_type, email, phone, password, org_id,
  job_title, last_login, active
  ) VALUES (\'J\', \'M\', \'admin\', \'ja@mu.co\', \'\', \'Hello1\', null,
  \'Developer\', \'\', \'true\')';

test('addUser query string', function (t) {
  t.equal(addUser(userObj), query,
    'addUser function takes an object and outputs a valid query string');
  t.end();
});
