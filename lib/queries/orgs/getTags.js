'use strict';

module.exports = function (id) {
  return [
    'SELECT',
    'tags.id AS org_tag_id,',
    'tags.name AS org_tag_name',
    'FROM tags',
    'JOIN tags_organisations',
    'ON tags.id = tags_organisations.tags_id',
    'JOIN organisations',
    'ON organisations.id = tags_organisations.organisations_id',
    'WHERE organisations.id = ' + id,
    'ORDER BY tags.name ASC;'
  ].join(' ');
};
