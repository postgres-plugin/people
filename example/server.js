'use strict';

var Hapi = require('hapi');
var pg = require('pg');
var register = require('../lib/index.js');
var tagsSystem = require('tags-system');

function init (config, callback) {
  var server = new Hapi.Server();
  var pool = new pg.Pool(config.pg);
  var optionsTags = {
    tags: [],
    categories: [],
    pool: pool
  };

  pool.on('error', function () {
    console.log('Pool error'); // eslint-disable-line
  });
  server.connection({ port: config.port });

  // register tags plugin which will create the tags table
  // which is referenced in tags_organisations
  server.register({
    register: tagsSystem,
    options: optionsTags
  }, function (errorTags) {
    if (errorTags) {
      return callback(errorTags);
    }

    return server.register([{
      register: register,
      options: {
        pool: pool,
        reset: Boolean(process.env.RESET_TABLES_PEOPLE), // reset with content passed in the options, change the env to true and restart to add content
        people: [],
        organisations: [],
        tags_organisations: []
      }
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
  });
}

module.exports = init;
