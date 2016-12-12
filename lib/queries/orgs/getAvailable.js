'use strict';

module.exports = [
  'SELECT name, id',
  'FROM organisations',
  'WHERE id NOT IN',
  '(SELECT org_id',
  'FROM people',
  'WHERE org_id IS NOT NULL',
  'AND active = TRUE',
  // prevent duplicates if there is more than one user per org
  'GROUP BY org_id)',
  'AND active = TRUE;'].join(' ');
