'use strict';

module.exports = function () {
  return [
    'SELECT DISTINCT',
    'locations_id',
    'FROM locations_organisations',
    'UNION',
    'SELECT DISTINCT',
    'locations_id',
    'FROM locations_challenges',
    'ORDER BY locations_id'
  ].join(' ');
};
