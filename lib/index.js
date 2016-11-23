'use strict';

var queries = require('./queries/index.js');
var query = require('pg-helpers').query;
var initialisePgPeople = require('./helpers/initialise-pg-people.js');
var initialiseQuery = require('./helpers/initialise-query.js');

function register (server, options, next) {
  var pool = options.pool;
  var initQuery = initialiseQuery(options);

  // initiliase data function
  query(initQuery, pool, function (initErr) {
    if (initErr) {
      return next(initErr);
    }

    server.ext('onPreAuth', function (request, reply) {
      initialisePgPeople(request);

      request.pg.people.getAllPeople = function (cb) {
        return query(queries.getAllPeople, pool, cb);
      };

      request.pg.people.getByEmail = function (email, cb) {
        return query(queries.getByEmail(email), pool, cb);
      };

      reply.continue();
    });

    return next();
  });
}

register.attributes = { name: 'people' };

module.exports = register;
