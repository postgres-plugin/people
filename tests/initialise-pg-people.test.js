'use strict';

var test = require('tape');
var initialisePgPeople = require('../lib/helpers/initialise-pg-people.js');

test('Add {pg: {people: {} }} to the object request', function (t) {
  var request = {};

  initialisePgPeople(request);
  t.deepEqual(request,
    { pg: { people: {} } },
    'The request object is initialise with pg.people');
  t.end();
});

test('Add pg.people to the object request with pg defined', function (t) {
  var request = { pg: {} };

  initialisePgPeople(request);
  t.deepEqual(request,
    { pg: { people: {} } },
    'The request object is initialise with pg.people (pg already defined)');
  t.end();
});
