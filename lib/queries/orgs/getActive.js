'use strict';

module.exports = [
  'SELECT organisations.name, organisations.id,',
  'people.id AS active_primary_user',
  'FROM organisations',
  'LEFT OUTER JOIN people',
  'ON organisations.id = people.org_id ',
  'AND people.active = true ',
  'AND people.user_type = \'primary\'',
  'WHERE organisations.active = true',
  'ORDER BY',
  // We want to order by the orgs that don't have a linked user first,
  'CASE WHEN people.id IS NULL THEN 0 ELSE 1 END,',
  // then alphabetically
  'organisations.name;'].join(' ');
