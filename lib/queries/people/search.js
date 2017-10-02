'use strict';

module.exports = function (searchTerm) {
  var peopleQuery = [
    'SELECT',
    'first_name,',
    'last_name,',
    'user_type,',
    'email,',
    'phone,',
    'job_title',
    'FROM people',
    'WHERE active = true',
    'AND LOWER(first_name || \' \' || last_name) like \'%' + searchTerm + '%\''
  ];

  return peopleQuery.join(' ');
};
