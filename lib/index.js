'use strict';

var queries = require('./queries/index.js');
var query = require('pg-helpers').query;
var initialiseQuery = require('./helpers/initialise-query.js');
var formatters = require('./formatters/index.js');

function register (server, options, next) {
  var pool = options.pool;
  var getAllPeople = function (cb) {
    return query(queries.getAllPeople, pool, function (err, res) { //eslint-disable-line
      if (err) {
        return cb(err);
      }

      return cb(null, res.rows);
    });
  };
  var peopleGetBy = function (constraint, value, cb) {
    return query(queries.peopleGetBy(constraint, value), pool, function (err, res) { //eslint-disable-line
      if (err) {
        return cb(err);
      }

      return cb(null, res.rows);
    });
  };

  var orgsGetByTag = function (active, filter, cb) {
    return query(queries.orgsGetByTag(active, filter), pool, function (err, res) { //eslint-disable-line
      if (err) {
        return cb(err, null);
      }

      return cb(null, formatters.orgsGetByTag(res.rows));
    });
  };
  var orgsGetDetails = function (id, cb) {
    return query(queries.orgsGetDetails(id), pool, function (err, res) {
      var result = {};

      if (!err) {
        result = formatters.orgsGetDetails(res.rows);
      }

      return cb(err, result);
    });
  };

  var orgsAdd = function (org, cb) {
    return query(queries.orgsAdd(org), pool, function (err, res) { //eslint-disable-line
      if (err) {
        return cb(err);
      }

      return cb(null, res.rows);
    });
  };

  var orgsToggleActive = function (id, cb) {
    return query(queries.orgsToggleActive(id), pool, cb);
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
    server.method('pg.organisations.toggleActive', orgsToggleActive);

    return next();
  });
}

register.attributes = { name: 'people' };

module.exports = register;
