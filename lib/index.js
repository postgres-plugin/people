'use strict';

var queries = require('./queries/index.js');
var query = require('pg-helpers').query;
var initialiseQuery = require('./helpers/initialise-query.js');
var formatters = require('./formatters/index.js');

function register (server, options, next) {
  var pool = options.pool;
  var getAllPeople = function (activeOnly, cb) {
    return query(queries.getAllPeople(activeOnly), pool, cb);
  };
  var peopleGetBy = function (constraint, value, cb) {
    return query(queries.peopleGetBy(constraint, value), pool, cb);
  };

  var orgsGetByTag = function (activeOnly, filter, cb) {
    return query(queries.orgsGetByTag(activeOnly, filter), pool,
      function (err, rows) {
        if (err) {
          return cb(err, null);
        }

        return cb(err, formatters.orgsGetByTag(rows));
      });
  };
  var orgsGetDetails = function (id, cb) {
    return query(queries.orgsGetDetails(id), pool, function (err, rows) {
      var res = {};

      if (!err) {
        res = formatters.orgsGetDetails(rows);
      }

      return cb(err, res);
    });
  };

  var orgsAdd = function (org, cb) {
    return query(queries.orgsAdd(org), pool, cb);
  };

  var initQuery = initialiseQuery(options);

  // initiliase data function
  query(initQuery, pool, function (initErr) {
    if (initErr) {
      return next(initErr);
    }

    server.method('pg.people.getAllPeople', getAllPeople);
    server.method('pg.people.getBy', peopleGetBy);
    server.method('pg.organisations.orgsGetByTag', orgsGetByTag);
    server.method('pg.organisations.getDetails', orgsGetDetails);
    server.method('pg.organisations.add', orgsAdd);

    return next();
  });
}

register.attributes = { name: 'people' };

module.exports = register;
