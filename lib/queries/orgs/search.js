'use strict';

module.exports = function (searchTerm) {
  return [
    'SELECT name, id, logo_url',
    'FROM organisations',
    'WHERE active = true',
    'AND name like \'%'+ searchTerm + '%\'',
    'ORDER BY name ASC;'
  ].join(' ');
};
