'use strict';

var Hapi = require('hapi');
var pg = require('pg');
var register = require('../lib/index.js');

function init (config, callback) {
  var server = new Hapi.Server();
  var pool = new pg.Pool(config.pg);

  pool.on('error', function () {
    console.log('Pool error'); // eslint-disable-line
  });
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
        method: 'GET',
        path: '/people',
        handler: function (request, reply) {
          request.pg.people.getAllPeople(function (error, response) { // eslint-disable-line
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
