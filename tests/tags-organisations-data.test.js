'use strict';

var test = require('tape');
var tagsOrgsData = require('../lib/fixtures/tags-organisations-data.js');

test('Convert array of tags-organisations to sql query', function (t) {
  var tagsOrgs = [
    {
      tags_id: 1,
      organisations_id: 2
    },
    {
      tags_id: 3,
      organisations_id: 4
    }
  ];
  var query = tagsOrgsData(tagsOrgs);
  var expected = 'INSERT INTO tags_organisations '
    + '(tags_id, organisations_id)'
    + ' VALUES '
    + '(1, 2),(3, 4);';

  t.equal(query, expected, 'Query to add tags_organisations is ok');
  t.end();
});
