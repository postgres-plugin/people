'use strict';

/**
* Convert an array of tags-orgs object to a sql insert command
*/

module.exports = function (tags_orgs) {
  var result = '';
  var values = '';

  if (tags_orgs.length > 0) {
    values = tags_orgs.map(function (to) {
      return '('
      + to.tags_id + ', '
      + to.organisations_id + ')';
    }).join(',');

    result = 'INSERT INTO tags_organisations ('
      + 'tags_id, '
      + 'organisations_id'
      + ') VALUES ' + values + ';';
  }

  return result;
};
