'use strict';

module.exports = function (searchTerm, searchTags) {
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
    "AND LOWER(first_name || ' ' || last_name) like '%" + searchTerm + "%'",
    "OR LOWER(job_title) like '%" + searchTerm + "%'",
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
    "WHERE LOWER(organisations.name) like '%" + searchTerm + "%'",
  ];

  var peopleTagQuery = [
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
    'JOIN tags_people ON tags_people.person_id = people.id',
    'WHERE tags_people.tags_id IN ' + convert (searchTags),
    'AND people.active is not false',
  ];

  if (searchTags.length) {
    var query = peopleQuery
      .concat (['UNION'], orgsQuery, ['UNION'], peopleTagQuery, [
        'ORDER BY last_name ASC',
      ])
      .join (' ');
    return query;
  } else {
    return peopleQuery.concat (['UNION'], orgsQuery).join (' ');
  }
};

function convert (ids) {
  var res = '(';
  ids.forEach (function (id, i) {
    if (i < ids.length - 1) {
      res += id + ', ';
    } else {
      res += id;
    }
  });
  res += ')';
  return res;
}
