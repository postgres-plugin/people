'use strict';

module.exports = function (id) {
  return [
    'SELECT',
    'organisations.id AS org_id,',
    'organisations.name AS org_name,',
    'organisations.logo_url AS org_logo_url,',
    'organisations.mission_statement AS org_mission_statement,',
    'organisations.active AS org_active,',
    'tags_organisations.tags_id AS tags_id,',
    'locations_organisations.locations_id AS locations_id',
    'FROM organisations',
    'LEFT OUTER JOIN tags_organisations ON tags_organisations.organisations_id = organisations.id',
    'LEFT OUTER JOIN locations_organisations ON locations_organisations.organisations_id = organisations.id',
    'WHERE id = ' + id + ';'
  ].join(' ');
};
