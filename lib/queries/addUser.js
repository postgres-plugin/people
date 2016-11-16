'use strict';

var fields = [
  'first_name',
  'last_name',
  'user_type',
  'email',
  'phone',
  'password',
  'org_id',
  'job_title',
  'last_login',
  'active'
];

module.exports = function (objectToAdd) {
  var values = fields.map(function (field) {
    return '\'' + objectToAdd[field] + '\'';
  }).join(', ');

  return 'INSERT INTO people (' + fields.join(', ') + ')'
    + ' VALUES (' + values + ')';
};
