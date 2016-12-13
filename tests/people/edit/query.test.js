'use strict';

var test = require('tape');
var query = require('../../../lib/queries/people/edit.js');

var fields = ['first_name', 'last_name', 'job_title', 'phone']; // should add email to this too for Admins?
var update = {
  first_name: 'Sally',
  last_name: 'Robertson',
  job_title: 'Chocolatier',
  phone: '07111111111'
};

var editUserProfileQuery = query(3, fields, update);
var expectedQuery = [
  'UPDATE people',
  'SET first_name = \'Sally\',',
  'last_name = \'Robertson\',',
  'job_title = \'Chocolatier\',',
  'phone = \'07111111111\'',
  'WHERE id = 3 ;'
].join(' ');

test('edit query-building function works', function (t) {
  t.equal(editUserProfileQuery, expectedQuery, 'edit query is built properly')
  t.end();
});
