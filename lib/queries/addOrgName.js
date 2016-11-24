'use strict';

/*
* Create a new organisation with active to true
*/

var escape = require('pg-escape');

module.exports = function (org_name) {
  return 'INSERT INTO organisations '
    + '(name, active) VALUES (' + escape.literal(org_name) + ', true);';
};

/*
INSERT INTO organisations (name, active) VALUES ({val}, true);
*/
