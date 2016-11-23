'use strict';

var test = require('tape');
var orgsData = require('../lib/fixtures/organisations-data.js');

test('Convert array of organisations to sql query', function (t) {
  var organisations = [
    {
      name: 'org1',
      logo_url: 'org-logo',
      mission_statement: 'do some good stuff',
      active: true
    }
  ];
  var query = orgsData(organisations);
  var expected = 'INSERT INTO organisations '
    + '(name, logo_url, mission_statement, active)'
    + ' VALUES '
    + '(\'org1\', \'org-logo\', \'do some good stuff\', true);';

  t.equal(query, expected, 'Query to add organisations is ok');
  t.end();
});
