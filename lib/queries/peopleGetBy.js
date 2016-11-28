'use strict';

var escape = require('pg-escape');

module.exports = function (constraint, value) {
  var escaped = value;

  if (constraint === 'email') {
    escaped = escape.literal(value);
  }

  return 'SELECT '
      + 'id, '
      + 'first_name, '
      + 'last_name, '
      + 'user_type, '
      + 'email, '
      + 'phone, '
      + 'password, '
      + 'job_title, '
      + 'last_login, '
      + 'active, '
      + 'account_activated '
      + 'FROM people '
      + 'WHERE ' + constraint + ' = ' + escaped + ';';
};


/*
SELECT
id,
first_name,
last_name,
user_type,
email,
phone,
job_title,
last_login,
active,
account_activated
FROM people
WHERE email = {email}
*/
