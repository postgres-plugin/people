'use strict';

var Hapi = require('hapi');
var pg = require('pg');
var register = require('../lib/index.js');
var tagsSystem = require('tags-system');
var peopleData = require('./data/people.json');
var organisationsData = require('./data/organisations.json');

function init (config, callback) {
  var server = new Hapi.Server();
  var pool = new pg.Pool(config.pg);
  var optionsTags = {
    tags: [],
    categories: [],
    pool: pool
  };
  var optionsPeople = {
    pool: pool,
    reset: Boolean(process.env.RESET_TABLES_PEOPLE), // reset with content passed in the options, change the env to true and restart to add content
    people: peopleData,
    organisations: organisationsData,
    tags_organisations: []
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
      options: optionsPeople
    }], function (err) {
      if (err) {
        return callback(err);
      }

      server.route([
        {
          method: 'GET',
          path: '/people',
          handler: function (request, reply) {
            request.server.methods.pg.people.getAllPeople(function (error, response) { // eslint-disable-line
              reply(response);
            });
          }
        },
        {
          method: 'GET',
          path: '/peopleGetById',
          handler: function (request, reply) {
            request.server.methods.pg.people.getBy('id', request.query.id, function (error, response) { // eslint-disable-line
              reply(response);
            });
          }
        },
        {
          method: 'GET',
          path: '/getbyemail',
          handler: function (request, reply) {
            request.server.methods.pg.people.getBy('email', 'bob.bobby@bob.com', function (error, response) { // eslint-disable-line
              reply(response);
            });
          }
        },
        {
          method: 'GET',
          path: '/addOrgName/{name}',
          handler: function (request, reply) {
            request.server.methods.pg.organisations.addOrgName(request.params.name, function (error, response) { // eslint-disable-line
              reply('error' + error + 'response' + response);
            });
          }
        },
        {
          method: 'GET',
          path: '/getActiveOrgs',
          handler: function (request, reply) {
            request.server.methods.pg.organisations.getActiveOrgs(function (error, response) { // eslint-disable-line
              reply(response);
            });
          }
        },
        {
          method: 'GET',
          path: '/orgsGetDetails',
          handler: function (request, reply) {
            // add params of orgId and maybe user.
            request.server.methods.pg.organisations.getDetails(function (error, response) { // eslint-disable-line
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
