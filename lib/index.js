'use strict';

var Boom = require('boom');
var query = require('pg-helpers').query;
var queries = require('./queries/index.js');
var initialiseQuery = require('./helpers/initialise-query.js');
var formatters = require('./formatters/index.js');

function register (server, options, next) {
  var pool = options.pool;
  var getAllPeople = function (cb) {
    return query(queries.getAllPeople(), pool, function (err, res) { //eslint-disable-line
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

  var peopleAdd = function (user, cb) {
    return query(queries.peopleAdd(user), pool, function (err, res) { //eslint-disable-line
      if (err) {
        return cb(err);
      }

      return cb(null, res.rows);
    });
  };

  var peopleToggleActive = function (id, cb) {
    return query(queries.peopleToggleActive(id), pool, function (err, res) { //eslint-disable-line
      if (err) {
        return cb(err);
      }
      if (res.rowCount === 0) {
        return cb(Boom.notFound('The user specified does not exist'));
      }

      return cb(null, res.rows);
    });
  };

  var peopleConsent = function(id, cb) {
    return query(queries.peopleConsent(id), pool, function (err, res) {
      if (err) {
        return cb(err);
      }
      if(res.rowCount === 0) {
        return cb(Boom.notFound('The user specified does not exist'));
      }

      return cb(null, res.rows);
    })
  }

  var peopleMarketing = function(id, cb) {
    return query(queries.peopleMarketing(id), pool, function (err, res) {
      if (err) {
        return cb(err);
      }
      if(res.rowCount === 0) {
        return cb(Boom.notFound('The user specified does not exist'));
      }

      return cb(null, res.rows);
    })
  }

  var peopleGetByOrgId = function (orgId, cb) {
    return query(queries.peopleGetByOrgId(orgId), pool, function (err, res) { //eslint-disable-line
      if (err) {
        return cb(err);
      }

      return cb(null, res.rows);
    });
  };

  var updateLastLogin = function (id, timestamp, cb) {
    return query(queries.updateLastLogin(id, timestamp), pool, function (err, res) { //eslint-disable-line
      if (err) {
        return cb(err);
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

  var orgsSearch = function (searchTerm, searchTags, searchLocations, cb) {
    return query(queries.orgSearch(searchTerm, searchTags, searchLocations), pool, function (err, res) {
      if (err) {
        return cb(err);
      }

      return cb(null, res.rows);
    });
  };

  var orgsGetById = function (id, cb) {
    return query(queries.orgGetById(id), pool, function (err, res) {
      if (err) {
        return cb(err);
      }

      return cb(null, formatters.orgsGetById(res.rows));
    });
  };

  var orgsGetTags = function (id, cb) {
    return query(queries.orgGetTags(id), pool, function (err, res) {
      if (err) {
        return cb(err);
      }

      return cb(null, res.rows);
    });
  };

  var peopleSearch = function (searchTerm, cb) {
    return query(queries.peopleSearch(searchTerm), pool, function (err, res) {
      if (err) {
        return cb(err);
      }

      return cb(null, res.rows);
    });
  };

  var orgsAddTags = function(itemId, tagIds, cb) {
    query(queries.orgsAddTags(itemId, tagIds), pool, function(queryErr, res) {

      return cb(queryErr, res.rows);
    });
  };

  var orgsAddLocations = function(itemId, tagIds, cb) {
    query(queries.orgsAddLocations(itemId, tagIds), pool, function(queryErr, res) {

      return cb(queryErr, res.rows);
    });
  };

  var orgsGetAll = function(cb) {
    query(queries.orgsGetAll, pool, function(queryErr, res) {

      return cb(queryErr, formatters.orgsGetAll(res.rows));
    });
  };

  var getUsedLocationsIds = function(cb) {
    query(queries.getUsedLocationsIds(), pool, function(queryErr, res) {

      return cb(queryErr, res.rows);
    });
  };

  var deleteUser = function (id, cb) {
    return query(queries.deleteUser(id), pool, function (err, res) { //eslint-disable-line
      if (err) {
        return cb(err);
      }
      if (res.rowCount === 0) {
        return cb(Boom.notFound('Cannot delete user with challenges or comments'));
      }

      return cb(null, res.rows);
    });
  };

  var deleteOrg = function (id, cb) {
    return query(queries.deleteOrg(id), pool, function (err, res) { //eslint-disable-line
      if (err) {
        return cb(err);
      }
      if (res.rowCount === 0) {
        return cb(Boom.notFound('Cannot delete organisation with users'));
      }

      return cb(null, res.rows);
    });
  };

  var initQuery = options.reset ? initialiseQuery : ((cb) => cb(null, null));

  // initiliase data function

    server.method('pg.people.getAllPeople', getAllPeople);
    server.method('pg.people.getBy', peopleGetBy);
    server.method('pg.people.addPassword', peopleAddPassword);
    server.method('pg.people.edit', peopleEdit);
    server.method('pg.people.add', peopleAdd);
    server.method('pg.people.toggleActive', peopleToggleActive);
    server.method('pg.people.peopleSearch', peopleSearch);
    server.method('pg.people.peopleGetByOrgId', peopleGetByOrgId);
    server.method('pg.people.peopleConsent', peopleConsent);
    server.method('pg.people.peopleMarketing', peopleMarketing);
    server.method('pg.people.deleteUser', deleteUser);
    server.method('pg.organisations.deleteOrg', deleteOrg);
    server.method('pg.organisations.orgsGetByTag', orgsGetByTag);
    server.method('pg.organisations.edit', orgsEdit);
    server.method('pg.organisations.getDetails', orgsGetDetails);
    server.method('pg.organisations.add', orgsAdd);
    server.method('pg.organisations.toggleActive', orgsToggleActive);
    server.method('pg.organisations.getActive', orgsGetActive);
    server.method('pg.organisations.orgsSearch', orgsSearch);
    server.method('pg.organisations.orgsGetById', orgsGetById);
    server.method('pg.organisations.orgsGetTags', orgsGetTags);
    server.method('pg.people.updateLastLogin', updateLastLogin);
    server.method('pg.organisations.orgsAddTags', orgsAddTags);
    server.method('pg.organisations.orgsAddLocations', orgsAddLocations);
    server.method('pg.organisations.orgsGetAll', orgsGetAll);
    server.method('pg.organisations.getUsedLocationsIds', getUsedLocationsIds);

    return next();
}

register.attributes = { name: 'people' };

module.exports = register;
