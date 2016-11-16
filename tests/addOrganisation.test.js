'use strict';

var test = require('tape');
var addOrganisation = require('../lib/queries/addOrganisation.js');
var orgObj = {
  name: 'Uniclover',
  logo_url: 'www.aurl.com',
  mission_statement: 'We are a wonderful company',
  active: true
};

var expectedQuery = 'INSERT INTO organisations ('
  + 'name, logo_url, mission_statement, active) '
  + 'VALUES (\'Uniclover\', \'www.aurl.com\', \'We are a wonderful company\', '
  + '\'true\');';

test('addUser query string', function (t) {
  t.equal(addOrganisation(orgObj), expectedQuery,
    'addUser function takes an object and outputs a valid query string');
  t.end();
});
