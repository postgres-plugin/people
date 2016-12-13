'use strict';

var test = require('tape');
var query = require('../../../lib/queries/people/edit.js');
var update = {
  first_name: 'Sally',
  last_name: 'Robertson',
  job_title: 'Chocolatier',
  phone: '07111111111'
};
var editUserProfileQuery = query(3, update);
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
