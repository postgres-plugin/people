'use strict';

module.exports = 'SELECT '
  + 'id, '
  + 'name, '
  + 'logo_url, '
  + 'mission_statement, '
  + 'active '
  + 'FROM organisations where active = true ORDER BY name;';
