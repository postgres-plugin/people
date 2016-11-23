'use strict';

module.exports = 'SELECT '
    + 'people.id, '
    + 'first_name, '
    + 'last_name, '
    + 'user_type, '
    + 'email, '
    + 'phone, '
    + 'name AS org_name, '
    + 'job_title, '
    + 'last_login, '
    + 'people.active '
    + 'FROM people '
    + 'LEFT JOIN organisations ON (people.id = organisations.id) '
    + 'ORDER BY first_name, last_name;';

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
LEFT JOIN organisations ON (people.id = organisations.id)
ORDER BY first_name, last_name;
*/
