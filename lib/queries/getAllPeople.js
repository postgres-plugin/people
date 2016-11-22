'use strict';

module.exports = 'SELECT id, first_name, last_name, user_type, email, phone,'
    + ' org_id, job_title, last_login, active '
    + 'FROM people ORDER BY first_name, last_name;';
