'use strict';

var escape = require('pg-escape');

module.exports = function (userId, password) {
  return [
    'UPDATE people SET',
    'password = ' + escape.literal(password),
    ', account_activated = true',
    'WHERE active = TRUE',
    'AND id = ' + userId,
    'RETURNING id, org_id;'
  ].join(' ');
};
