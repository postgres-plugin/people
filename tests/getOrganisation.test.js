'use strict';

var test = require('tape');
var getOrganisation = require('../lib/queries/getOrganisation.js');
var orgId = 1;

var expectedQuery = 'SELECT id, name, logo_url, mission_statement, active '
  + 'FROM organisations WHERE id = 1;';

test('getOrganisation query string', function (t) {
  t.equal(getOrganisation(orgId), expectedQuery,
    'getOrganisation function takes a number and outputs a valid query string');
  t.end();
});
