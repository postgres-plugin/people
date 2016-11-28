'use strict';

var queries = require('./queries/index.js');
var query = require('pg-helpers').query;
var initialiseQuery = require('./helpers/initialise-query.js');

function register (server, options, next) {
  var pool = options.pool;
  var getAllPeople = function (cb) {
    return query(queries.getAllPeople, pool, cb);
  };
  var getByEmail = function (email, cb) {
    return query(queries.getByEmail(email), pool, cb);
  };
  var addOrgName = function (orgName, cb) {
    return query(queries.addOrgName(orgName), pool, cb);
  };
  var getActiveOrgs = function (cb) {
    return query(queries.getActiveOrgs, pool, cb);
  };
  var initQuery = initialiseQuery(options);

  // initiliase data function
  query(initQuery, pool, function (initErr) {
    if (initErr) {
      return next(initErr);
    }

    server.method('pg.people.getAllPeople', getAllPeople);
    server.method('pg.people.getByEmail', getByEmail);
    server.method('pg.organisations.addOrgName', addOrgName);
    server.method('pg.organisations.getActiveOrgs', getActiveOrgs);

    return next();
  });
}

register.attributes = { name: 'people' };

module.exports = register;
