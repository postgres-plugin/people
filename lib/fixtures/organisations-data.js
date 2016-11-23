'use strict';

/**
* Convert an array of organisations object to a sql insert command
*/

var escape = require('pg-escape');

module.exports = function (organisations) {
  var result = '';
  var values = '';

  if (organisations.length > 0) {
    values = organisations.map(function (o) {
      return '('
      + escape.literal(o.name) + ', '
      + escape.literal(o.logo_url) + ', '
      + escape.literal(o.mission_statement) + ', '
      + o.active + ')';
    }).join(',');

    result = 'INSERT INTO organisations ('
      + 'name, '
      + 'logo_url, '
      + 'mission_statement, '
      + 'active'
      + ') VALUES ' + values + ';';
  }

  return result;
};
