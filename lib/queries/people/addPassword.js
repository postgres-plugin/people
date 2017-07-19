'use strict';

var escape = require('pg-escape');

module.exports = function (userId, password) {
  return [
    'UPDATE people SET',
    'password = ' + escape.literal(password),
    ', account_activated = true',
    'WHERE active = TRUE',
    'AND id = ' + userId,
    'RETURNING org_id, user_type,',
    // we select the old value of 'account_activated' to determine if
    // this is a new user or a returning one
    '( SELECT account_activated AS returning_user',
    'FROM people WHERE active = TRUE',
    'AND id = ' + userId,
    ') AS returning_user;'
  ].join(' ');
};
