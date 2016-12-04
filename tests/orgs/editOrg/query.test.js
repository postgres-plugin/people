'use strict';

var test = require('tape');

var editQuery = require('../../../lib/queries/orgs/edit.js');

var orgObj = {
  mission_statement: 'We are the world',
  name: 'New Name'
}

var actual = editQuery(1, orgObj)

var expected =
  'UPDATE organisations '
  + 'SET name = \'New Name\', '
  + 'mission_statement = \'We are the world\' '
  + 'WHERE id = 1 ;';

test('edit org query builds a functioning query', function (t) {
  t.equal(actual, expected, 'query is good');
  t.end();
});
