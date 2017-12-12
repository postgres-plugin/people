'use strict';

module.exports = function () {
  var query = [
    'SELECT',
    'people.id,',
    'first_name,',
    'last_name,',
    'user_type,',
    'email,',
    'phone,',
    'people.logo_url,',
    'org_id,',
    'name AS org_name,',
    'job_title,',
    'last_login,',
    'people.active,',
    'people.account_activated',
    'FROM people',
    'LEFT JOIN organisations ON (people.org_id = organisations.id)',
    'ORDER BY first_name, last_name;'
  ];

  return query.join(' ');
};

/*
SELECT
people.id,
first_name,
last_name,
user_type,
email,
phone,
name,
job_title,
last_login,
people.active  FROM people
LEFT JOIN organisations ON (people.org_id = organisations.id)
WHERE people.active = true
ORDER BY first_name, last_name;
*/
