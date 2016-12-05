'use strict';

var escape = require('pg-escape');


var fields = ['name', 'mission_statement', 'logo_url'];

function getValues (org) {
  var values = fields.map(function (key) {
    if (org[key]) {
      return escape.literal(org[key]);
    }

    // When joined, this is read as null as opposed to 'null'
    return 'null';
  });

  return values.join(', ');
}


module.exports = function (org) {
  return 'INSERT INTO organisations '
    + '(active, ' + fields.join(', ') + ')'
    + ' VALUES (true, ' + getValues(org) + ');';
};
