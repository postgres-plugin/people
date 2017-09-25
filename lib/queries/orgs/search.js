'use strict';

module.exports = function (searchTerm) {
  var orgQuery = [
    'SELECT name AS org_name, id AS org_id, logo_url AS org_logo_url',
    'FROM organisations',
    'WHERE active = true',
    'AND LOWER(name) like \'%' + searchTerm + '%\''
  ];

  var orgTagQuery = [
    'SELECT',
    'organisations.name AS org_name,',
    'organisations.id AS org_id,',
    'organisations.logo_url AS org_logo_url',
    'FROM organisations',
    'JOIN tags_organisations',
    'ON tags_organisations.organisations_id = organisations.id',
    'JOIN tags',
    'ON tags_organisations.tags_id = tags.id',
    'WHERE LOWER(tags.name) like \'%' + searchTerm + '%\'',
    'ORDER BY org_name ASC;'
  ];

  return orgQuery.concat(['UNION'], orgTagQuery).join(' ');
};
