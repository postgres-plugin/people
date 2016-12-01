'use strict';

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
    return query.join(' ');
  } else if (active && !tagId) {
    return query.concat([
      'WHERE organisations.active = ' + active,
      ';']).join(' ');
  } else if (!active && tagId) {
    query.splice(1, 0, 'tags.name AS tags_name,');

    return query.concat([
      'JOIN tags_organisations',
      'ON tags_organisations.organisations_id = organisations.id',
      'JOIN tags',
      'ON tags_organisations.tags_id = tags.id',
      'WHERE tags.id = ' + tagId,
      ';']).join(' ');
  }
  // If active && filter: eslint-disable-line
  query.splice(1, 0, 'tags.name AS tags_name,');

  return query.concat([
    'JOIN tags_organisations',
    'ON tags_organisations.organisations_id = organisations.id',
    'JOIN tags',
    'ON tags_organisations.tags_id = tags.id',
    'WHERE tags.id = ' + tagId,
    'AND organisations.active = ' + active,
    ';']).join(' ');
};
