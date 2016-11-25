'use strict';

var escape = require('pg-escape');

module.exports = function (email) {
  return 'SELECT '
      + 'id, '
      + 'first_name, '
      + 'last_name, '
      + 'user_type, '
      + 'email, '
      + 'phone, '
      + 'job_title, '
      + 'last_login, '
      + 'active, '
      + 'account_activated '
      + 'FROM people '
      + 'WHERE email = ' + escape.literal(email);
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
account_actived
FROM people
WHERE email = {email}
*/
