'use strict';

function allOrgs (query) {
  var additional = [
    'ORDER BY organisations.name ASC ;'
  ];

  return query.concat(additional).join(' ');
}

function allActiveOrgs (query) {
  var additional = [
    'WHERE organisations.active IS NOT FALSE',
    'ORDER BY organisations.name ASC ;'
  ];

  return query.concat(additional).join(' ');
}

function filterAllOrgs (query, tagId) {
  var additional = [
    'JOIN tags_organisations',
    'ON tags_organisations.organisations_id = organisations.id',
    'RIGHT OUTER JOIN tags',
    'ON tags_organisations.tags_id = tags.id',
    'WHERE tags.id = ' + tagId,
    'ORDER BY organisations.name ASC ;'
  ];

  query.splice(1, 0, 'tags.name AS filter_tag,');

  return query.concat(additional).join(' ');
}

function filterActiveOrgs (query, tagId) {
  var additional = [
    'JOIN tags_organisations',
    'ON tags_organisations.organisations_id = organisations.id',
    'RIGHT OUTER JOIN tags',
    'ON tags_organisations.tags_id = tags.id',
    'WHERE tags.id = ' + tagId,
    'AND organisations.active IS NOT FALSE',
    'ORDER BY organisations.name ASC ;'
  ];

  query.splice(1, 0, 'tags.name AS filter_tag,');

  return query.concat(additional).join(' ');
}

module.exports = function (active, tagId) {
  var query = [
    'SELECT',
    'organisations.id AS id,',
    'organisations.name AS name,',
    'organisations.logo_url AS logo_url,',
    'organisations.active AS active',
    'FROM organisations'
  ];

  if (!active && !tagId) {
    return allOrgs(query);
  } else if (active && !tagId) {
    return allActiveOrgs(query);
  } else if (!active && tagId) {
    return filterAllOrgs(query, tagId);
  } // active  && tagId

  return filterActiveOrgs(query, tagId);
};
