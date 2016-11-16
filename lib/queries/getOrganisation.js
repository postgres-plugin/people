'use strict';

module.exports = function (id) {
  return 'SELECT id, name, logo_url, mission_statement, active '
    + 'FROM organisations WHERE id = ' + id + ';';
};
