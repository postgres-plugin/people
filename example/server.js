'use strict';

var Hapi = require('hapi');
var Hoek = require('hoek');
var pg = require('pg');
var register = require('../lib/index.js');

function init (config, callback) {
  var server = new Hapi.Server();
  var pool = new pg.Pool(config.pg);

  server.connection({ port: config.port });

  server.register([{
    register: register,
    options: { pool: pool }
  }], function (err) {
    if (err) {
      return callback(err);
    }

    server.route([
      {
        method: 'POST',
        path: '/people',
        handler: function (request, reply) {
          request.addUser(request.payload, function (error, response) {
            Hoek.assert(!error, 'Add User failed');
            reply(response);
          });
        }
      }, {
        method: 'GET',
        path: '/people/{id}',
        handler: function (request, reply) {
          request.getUser(request.params.id, function (error, response) {
            Hoek.assert(!error, 'Get User failed');
            reply(response);
          });
        }
      }, {
        method: 'POST',
        path: '/orgs',
        handler: function (request, reply) {
          request.addOrganisation(request.payload, function (error, response) {
            Hoek.assert(!error, 'Add Org failed');
            reply(response);
          });
        }
      }, {
        method: 'GET',
        path: '/orgs/{id}',
        handler: function (request, reply) {
          request.getOrganisation(request.params.id, function (error, response) {
            Hoek.assert(!error, 'Get Org failed');
            reply(response);
          });
        }
      }
    ]);

    return server.start(function (errorStart) {
      return callback(errorStart, server, pool);
    });
  });
}

module.exports = init;
