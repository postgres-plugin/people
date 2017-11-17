'use strict';

module.exports = function (searchTerm, searchTags) {
  var orgQuery = [
    'SELECT',
    'name AS org_name,',
    'id AS org_id,',
    'logo_url AS org_logo_url,',
    'mission_statement AS org_mission_statement',
    'FROM organisations',
    'WHERE active = true',
    'AND LOWER(name) like \'%' + searchTerm + '%\'',
    'OR LOWER(mission_statement) like \'%' + searchTerm + '%\''
  ];

  var orgTagQuery = [
    'SELECT',
    'organisations.name AS org_name,',
    'organisations.id AS org_id,',
    'organisations.logo_url AS org_logo_url,',
    'mission_statement AS org_mission_statement',
    'FROM organisations',
    'JOIN tags_organisations',
    'ON tags_organisations.organisations_id = organisations.id',
    'WHERE tags_organisations.tags_id IN ' + convert(searchTags),
    'ORDER BY org_name ASC;'
  ];

  return orgQuery.concat(['UNION'], orgTagQuery).join(' ');
};

function convert(ids) {
  var res = '(';
  ids.forEach(function(id, i) {
    if (i < ids.length - 1) {
      res += id + ', ';
    } else {
      res += id;
    }
  });
  res += ')';
  return res;
}
