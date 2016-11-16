'use strict';

var path = require('path');
var fs = require('fs');
var queries = require('./queries/index.js');
var query = require('pg-helpers').query;

var file = path.resolve(__dirname, './fixtures/initialiseTables.sql');
var fixtures = fs.readFileSync(file, 'utf8').toString();

function register (server, options, next) {
  var pool = options.pool;

  query(fixtures, pool, function (initErr) {
    if (initErr) {
      return next(initErr);
    }

    server.ext('onPreHandler', function (request, reply) {
      request.addUser = function (userObj, cb) {
        query(queries.addUser(userObj), pool, cb);
      };

      request.getUser = function (userId, cb) {
        query(queries.getUser(userId), pool, cb);
      };

      request.addOrganisation = function (orgObj, cb) {
        query(queries.addOrganisation(orgObj), pool, cb);
      };

      request.getOrganisation = function (orgId, cb) {
        query(queries.getOrganisation(orgId), pool, cb);
      };
      reply.continue();
    });

    return next();
  });
}

register.attributes = { name: 'people' };

module.exports = register;
