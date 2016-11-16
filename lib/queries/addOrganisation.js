'use strict';

var fields = [
  'name',
  'logo_url',
  'mission_statement',
  'active'
];

module.exports = function (objectToAdd) {
  var values = fields.map(function (field) {
    return '\'' + objectToAdd[field] + '\'';
  }).join(', ');

  return 'INSERT INTO organisations (' + fields.join(', ') + ')'
    + ' VALUES (' + values + ');';
};
