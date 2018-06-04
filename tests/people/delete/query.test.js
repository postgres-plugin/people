'use strict';

var test = require('tape');
var query = require('../../../lib/queries/people/deleteUser.js');

var deleteUserProfileQuery = query(3);
var expectedQuery = [
  'DELETE FROM people'
  , 'WHERE people.id IN'
  , '(SELECT people.id FROM people'
  , 'FULL JOIN challenges'
  , 'ON challenges.creator_id = people.id'
  , 'FULL JOIN comments'
  , 'ON comments.author_id = people.id AND comments.active = true'
  , 'WHERE people.id = 3'
  , 'GROUP BY people.id'
  , 'HAVING COUNT(challenges) = 0'
  , 'AND COUNT(comments) = 0);'
].join(' ');

test('edit query-building function works', function (t) {
  t.equal(deleteUserProfileQuery, expectedQuery, 'delete query is built properly')
  t.end();
});
