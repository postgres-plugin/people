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
  'organisations.name;'].join(' ');
