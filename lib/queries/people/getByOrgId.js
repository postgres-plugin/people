'use strict';

module.exports = function (orgId) {
  var query = [
    'SELECT',
    'id,',
    'first_name,',
    'last_name,',
    'user_type,',
    'email,',
    'phone,',
    'logo_url,',
    'org_id,',
    'job_title,',
    'last_login,',
    'active,',
    'account_activated',
    'FROM people',
    'WHERE active = true',
    'AND account_activated = true',
    'AND org_id = ' + orgId,
    'ORDER BY last_name, first_name;'
  ];

  return query.join(' ');
};
