'use strict';

module.exports = function (id) {
  return [
    'SELECT',
    'tags.id AS person_tag_id,',
    'tags.name AS person_tag_name',
    'FROM tags',
    'JOIN tags_people',
    'ON tags.id = tags_people.tags_id',
    'JOIN people',
    'ON people.id = tags_people.person_id',
    'WHERE people.id = ' + id,
    'ORDER BY tags.name ASC;'
  ].join(' ');
};
