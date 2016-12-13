'use strict';

var escape = require('pg-escape');

module.exports = function (userId, fields, updatedProfile) {
  var newValues = fields.reduce(function (arr, key) {
    return arr.concat(key + ' = ' + escape.literal(updatedProfile[key]));
  }, []).join(', ');

  return [
    'UPDATE',
    'people',
    'SET',
    newValues,
    'WHERE',
    'id = ' + userId,
    ';'
  ].join(' ');
};
