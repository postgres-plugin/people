'use strict';

module.exports = function (id) {
  return [
    'SELECT',
    'organisations.id AS org_id,',
    'organisations.name AS org_name,',
    'organisations.logo_url AS org_logo_url,',
    'organisations.mission_statement AS org_mission_statement,',
    'organisations.active AS org_active',
    'FROM organisations',
    'WHERE id = ' + id + ';'
  ].join(' ');
};
