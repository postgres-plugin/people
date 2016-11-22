'use strict';

var path = require('path');
var fs = require('fs');
var queries = require('./queries/index.js');
var query = require('pg-helpers').query;

var file = path.resolve(__dirname, './fixtures/initialiseTables.sql');
var fixtures = fs.readFileSync(file, 'utf8').toString();
var initialisePgPeople = require('./helpers/initialise-pg-people.js');

function register (server, options, next) {
  var pool = options.pool;

  query(fixtures, pool, function (initErr) {
    if (initErr) {
      return next(initErr);
    }

    server.ext('onPreAuth', function (request, reply) {
      initialisePgPeople(request);

      request.pg.people.getAllPeople = function (cb) {
        return query(queries.getAllPeople, pool, cb);
      };

      reply.continue();
    });

    return next();
  });
}

register.attributes = { name: 'people' };

module.exports = register;
