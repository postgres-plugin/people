'use strict';

module.exports = function (searchTerm) {
  var peopleQuery = [
    'SELECT',
    'people.id,',
    'first_name,',
    'last_name,',
    'user_type,',
    'email,',
    'phone,',
    'job_title,',
    'people.active,',
    'account_activated,',
    'people.logo_url,',
    'org_id,',
    'name AS org_name',
    'FROM people',
    'LEFT OUTER JOIN organisations',
    'ON organisations.id = people.org_id',
    'WHERE people.active = true',
    'AND LOWER(first_name || \' \' || last_name) like \'%' + searchTerm + '%\'',
    'OR LOWER(job_title) like \'%' + searchTerm + '%\''
  ];

  var orgsQuery = [
    'SELECT',
    'people.id,',
    'first_name,',
    'last_name,',
    'user_type,',
    'email,',
    'phone,',
    'job_title,',
    'people.active,',
    'account_activated,',
    'people.logo_url,',
    'org_id,',
    'name AS org_name',
    'FROM people',
    'JOIN organisations',
    'ON organisations.id = people.org_id',
    'WHERE LOWER(organisations.name) like \'%' + searchTerm + '%\'',
    'ORDER BY last_name ASC;'
  ];

  return peopleQuery.concat(['UNION'], orgsQuery).join(' ');
};
