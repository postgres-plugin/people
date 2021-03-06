'use strict';

var test = require('tape');
var queryFunc = require('../../../lib/queries/people/peopleGetBy.js');


// people.getBy('id')
var getByIdQuery = queryFunc('id', 1);
var expectedGetById = 'SELECT id, first_name, last_name, user_type, email, '
  + 'phone, password, job_title, last_login, logo_url, active, org_id, '
  + 'notification_email, account_activated, consent, marketing FROM '
  + 'people WHERE id = 1;';

// people.getBy('email')
var getByEmailQuery = queryFunc('email', 'bob.bobby@bob.com');
var expectedGetByEmail = 'SELECT id, first_name, last_name, user_type, email, '
  + 'phone, password, job_title, last_login, logo_url, active, org_id, '
  + 'notification_email, account_activated, consent, marketing '
  + 'FROM people WHERE email = \'bob.bobby@bob.com\';';


test('getBy query-building function works', function (t) {
  t.equal(getByIdQuery, expectedGetById, 'getById query is built properly')
  t.equal(getByEmailQuery, expectedGetByEmail, 'getByEmail query is built properly')
  t.end();
})
