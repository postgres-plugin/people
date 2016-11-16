'use strict';

module.exports = function (id) {
  return 'SELECT id, first_name, last_name, user_type, email, phone,'
    + ' org_id, job_title, last_login, active '
    + 'FROM people WHERE id = ' + id + ';';
};
