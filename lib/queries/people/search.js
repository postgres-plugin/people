'use strict';

module.exports = function (searchTerm) {
  var peopleQuery = [
    'SELECT',
    'people.id AS people_id,',
    'first_name,',
    'last_name,',
    'user_type,',
    'email,',
    'phone,',
    'job_title,',
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
    'people.id AS people_id,',
    'first_name,',
    'last_name,',
    'user_type,',
    'email,',
    'phone,',
    'job_title,',
    'name AS org_name',
    'FROM people',
    'JOIN organisations',
    'ON organisations.id = people.org_id',
    'WHERE LOWER(organisations.name) like \'%' + searchTerm + '%\'',
    'ORDER BY first_name ASC;'
  ];

  return peopleQuery.concat(['UNION'], orgsQuery).join(' ');
};
