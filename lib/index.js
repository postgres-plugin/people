'use strict';

var queries = require('./queries/index.js');
var query = require('pg-helpers').query;
var initialiseQuery = require('./helpers/initialise-query.js');
var formatters = require('./formatters/index.js');

function register (server, options, next) {
  var pool = options.pool;
  var getAllPeople = function (cb) {
    return query(queries.getAllPeople, pool, cb);
  };
  var peopleGetBy = function (constraint, value, cb) {
    return query(queries.peopleGetBy(constraint, value), pool, cb);
  };
  var addOrgName = function (orgName, cb) {
    return query(queries.addOrgName(orgName), pool, cb);
  };
  var getActiveOrgs = function (cb) {
    return query(queries.getActiveOrgs, pool, cb);
  };
  var orgsGetDetails = function (id, cb) {
    return query(queries.orgsGetDetails(id), pool, function (err, rows) {
      var res = [];

      console.log(err, rows);
      if (!err) {
        res = formatters.orgsGetDetails(rows);
      }

      return cb(err, res);
    });
  };
  var initQuery = initialiseQuery(options);

  // initiliase data function
  query(initQuery, pool, function (initErr) {
    if (initErr) {
      return next(initErr);
    }

    server.method('pg.people.getAllPeople', getAllPeople);
    server.method('pg.people.getBy', peopleGetBy);
    server.method('pg.organisations.addOrgName', addOrgName);
    server.method('pg.organisations.getActiveOrgs', getActiveOrgs);
    server.method('pg.organisations.getById', getActiveOrgs);
    server.method('pg.organisations.getDetails', orgsGetDetails);

    return next();
  });
}

register.attributes = { name: 'people' };

module.exports = register;
