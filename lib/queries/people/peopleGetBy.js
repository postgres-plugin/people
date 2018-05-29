'use strict';

var escape = require('pg-escape');

module.exports = function (constraint, value) {
  console.log(constraint, value);

  var escaped = value;

  if (constraint === 'email') {
    escaped = escape.literal(value);
  }

  var query = 'SELECT '
    + 'id, '
    + 'first_name, '
    + 'last_name, '
    + 'user_type, '
    + 'email, '
    + 'phone, '
    + 'password, '
    + 'job_title, '
    + 'last_login, '
    + 'logo_url, '
    + 'active, '
    + 'org_id, '
    + 'notification_email, '
    + 'account_activated, '
    + 'consent, '
    + 'marketing '
    + 'FROM people '
    + 'LEFT OUTER JOIN tags_people '
    + 'ON (tags_people.person_id = people.id) '
    + 'WHERE ' + constraint + ' = ' + escaped + ';';
  console.log(query);
  return query;
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
account_activated,
consent,
marketing
FROM people
WHERE email = {email}
*/
