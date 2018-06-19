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
    'people.account_activated,',
    'string_agg(tags_people.tags_id::text, \',\') AS tags',
    'FROM people',
    'FULL JOIN tags_people',
    'ON (tags_people.person_id = people.id)',
    'LEFT JOIN organisations ON (people.org_id = organisations.id)',
    'GROUP BY people.id, organisations.name',
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
