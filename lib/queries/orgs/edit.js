'use strict';

var escape = require('pg-escape');

var fields = ['name', 'logo_url', 'mission_statement'];

module.exports = function (orgId, orgObj) {
  // This function can be given an object with different keys.
  // We want to update the table with each of the keys that is present.
  var newValues = fields.reduce(function (arr, key) {
    if (orgObj[key]) {
      return arr.concat(key + ' = ' + escape.literal(orgObj[key]));
    }

    return arr;
  }, []).join(', ');

  return [
    'UPDATE',
    'organisations',
    'SET',
    newValues,
    'WHERE',
    'id = ' + orgId,
    ';'
  ].join(' ');
};
