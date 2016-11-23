'use strict';

var test = require('tape');
var initialiseQuery = require('../lib/helpers/initialise-query.js');
var fs = require('fs');
var path = require('path');
var file = path.resolve(__dirname, '../lib/fixtures/create-tables.sql');
var fileDrop = path.resolve(__dirname, '../lib/fixtures/drop-tables.sql');
var createTables = fs.readFileSync(file, 'utf8').toString();
var dropTables = fs.readFileSync(fileDrop, 'utf8').toString();

test('Create intialise query with reset = false', function (t) {
  var options = {
    reset: false,
    people: [],
    organisations: [],
    tags_orgs: []
  };

  var query = initialiseQuery(options);

  t.equal(query, createTables, 'Initialise query with reset false ok');
  t.end();
});

test('Create intialise query with reset = true', function (t) {
  var organisations = [
    {
      name: 'org1',
      logo_url: 'org-logo',
      mission_statement: 'do some good stuff',
      active: true
    }
  ];
  var people = [
    {
      first_name: 'bob',
      last_name: 'bobby',
      user_type: 'admin',
      email: 'bob.bobby@bob.com',
      phone: '007',
      password: '123pwd',
      org_id: 1,
      job_title: 'user',
      active: true
    }
  ];
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
  var options = {
    reset: true,
    people: people,
    organisations: organisations,
    tags_organisations: tagsOrgs
  };

  var query = initialiseQuery(options);

  t.equal(query.indexOf('-- Delete table') > -1, true, 'The tables are deleted');
  t.equal(query.indexOf('-- Create table') > -1, true, 'The tables are created');
  t.equal(query.indexOf('INSERT INTO organisations') > -1, true, 'Values inserted');
  t.end();
});
