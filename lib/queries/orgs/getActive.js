'use strict';

module.exports = [
  'SELECT name, id',
  'FROM organisations',
  'WHERE active = true',
  'ORDER BY name ASC;'
].join(' ');
