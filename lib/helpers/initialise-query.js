'use strict';

/**
* create an sql query which
* - create the tables people, organisations, tags_organisations if not defined
* - add some content to the table if options.reset is true
*/
var path = require('path');
var fs = require('fs');
var dropFile = path.resolve(__dirname, '../fixtures/drop-tables.sql');
var createTablesFile = path.resolve(__dirname, '../fixtures/create-tables.sql');
var triggersFile = path.resolve(__dirname, '../fixtures/set-triggers.sql');
var dropTables = fs.readFileSync(dropFile, 'utf8').toString();
var setTriggers = fs.readFileSync(triggersFile, 'utf8').toString();
var createTables = fs.readFileSync(createTablesFile, 'utf8').toString();
var peopleData = require('../fixtures/people-data.js');
var organisationsData = require('../fixtures/organisations-data.js');
var tagsOrgsData = require('../fixtures/tags-organisations-data.js');
var tagsPeopleData = require('../fixtures/tags-people-data.js');

module.exports = function (options) {
  var query = '';

  if (options.reset) {
    query += dropTables;
    query += createTables;
    query += organisationsData(options.organisations);
    query += peopleData(options.people);
    query += tagsOrgsData(options.tags_organisations);
    query += tagsPeopleData(options.tags_people);
    query += setTriggers;

    return query;
  }

  return createTables;
};
