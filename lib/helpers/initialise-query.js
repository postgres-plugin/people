'use strict';

/**
* create an sql query which
* - create the tables people, organisations, tags_organisations if not defined
* - add some content to the table if options.reset is true
*/
var query = require('pg-helpers').query;
var peopleData = require('../fixtures/people-data.js');
var organisationsData = require('../fixtures/organisations-data.js');
var tagsOrgsData = require('../fixtures/tags-organisations-data.js');
var tagsPeopleData = require('../fixtures/tags-people-data.js');

module.exports = function (options, pool, cb) {
  var queryString = organisationsData(options.organisations)
  + peopleData(options.people)
  + tagsOrgsData(options.tags_organisations);

  return query(queryString, pool, cb);
};
