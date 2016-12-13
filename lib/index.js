'use strict';

var Boom = require('boom');
var query = require('pg-helpers').query;
var queries = require('./queries/index.js');
var initialiseQuery = require('./helpers/initialise-query.js');
var formatters = require('./formatters/index.js');

function register (server, options, next) {
  var pool = options.pool;
  var getAllPeople = function (activeOnly, cb) {
    return query(queries.getAllPeople(activeOnly), pool, function (err, res) { //eslint-disable-line
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


  var peopleAddPassword = function (userId, password, cb) {
    return query(queries.peopleAddPassword(userId, password), pool, function (err, res) { //eslint-disable-line
      if (err) {
        return cb(err);
      }

      return cb(null, res.rows);
    });
  };

  var peopleEdit = function (userId, updatedProfile, cb) {
    var updatePeopleQuery = queries.peopleEdit(userId, updatedProfile);

    return query(updatePeopleQuery, pool, function (err, res) {
      if (err) {
        return cb(err);
      }

      if (res.rowCount === 0) {
        return cb(Boom.notFound('The user specified does not exist'), null);
      }

      return cb(null, res.rows);
    });
  };

  var orgsGetByTag = function (activeOnly, filter, cb) {
    return query(queries.orgsGetByTag(activeOnly, filter), pool, function (err, res) { //eslint-disable-line
      if (err) {
        return cb(err, null);
      }

      if (res.rows.length === 0) { // i.e. no orgs -OR- filter --> wrong tagId or no orgs data
        return cb(Boom.badRequest('invalid tag'), null);
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

  var orgsEdit = function (id, orgObj, cb) {
    return query(queries.orgsEdit(id, orgObj), pool,  function (err, res) { //eslint-disable-line
      if (err) {
        return cb(err);
      }
      // if there were no rows affected, the organisation id does not exist.
      if (res.rowCount === 0) {
        return cb(Boom.notFound('That organisation does not exist'));
      }

      return cb(null, res.rows);
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
    return query(queries.orgsToggleActive(id), pool, function (err, res) { //eslint-disable-line
      if (err) {
        return cb(err);
      }
      if (res.rowCount === 0) {
        return cb(Boom.notFound('That organisation does not exist'));
      }

      return cb(null, res.rows);
    });
  };

  var orgsGetActive = function (cb) {
    return query(queries.orgsGetActive, pool, function (err, res) { //eslint-disable-line
      if (err) {
        return cb(err);
      }

      return cb(null, res.rows);
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
    server.method('pg.people.addPassword', peopleAddPassword);
    server.method('pg.people.edit', peopleEdit);
    server.method('pg.organisations.orgsGetByTag', orgsGetByTag);
    server.method('pg.organisations.edit', orgsEdit);
    server.method('pg.organisations.getDetails', orgsGetDetails);
    server.method('pg.organisations.add', orgsAdd);
    server.method('pg.organisations.toggleActive', orgsToggleActive);
    server.method('pg.organisations.getActive', orgsGetActive);

    return next();
  });
}

register.attributes = { name: 'people' };

module.exports = register;
