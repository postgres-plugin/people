'use strict';

var Hapi = require('hapi');
var pg = require('pg');
var Hoek = require('hoek');
// pg plugins
var people = require('../lib/index.js');
var tags = require('tags-system');
var challenges = require('pg-challenges');

// pg tables data
var tagsData = require('./data/tags.json');
var categoriesData = require('./data/categories.json');
var peopleData = require('./data/people.json');
var organisationsData = require('./data/organisations.json');
var tagsOrgsData = require('./data/tags_organisations.json');
var challengesData = require('./data/challenges.json');
var tagsChallengesData = require('./data/tags_challenges.json');

function init (config, callback) {
  var server = new Hapi.Server();
  var pool = new pg.Pool(config.pg);
  var optionsTags = {
    reset: true,
    tags: tagsData,
    categories: categoriesData,
    pool: pool
  };
  var optionsPeople = {
    pool: pool,
    reset: true,
    people: peopleData,
    organisations: organisationsData,
    tags_organisations: tagsOrgsData
  };
  var optionsChallenges = {
    pool: pool,
    reset: true,
    challenges: challengesData,
    tags_challenges: tagsChallengesData
  };


  pool.on('error', function () {
    console.log('Pool error'); // eslint-disable-line
  });
  server.connection({ port: config.port });

  // register tags plugin which will create the tags table
  // which is referenced in tags_organisations
  server.register({
    register: tags,
    options: optionsTags
  }, function (errorTags) {
    if (errorTags) {
      console.log('error tags'); // eslint-disable-line

      return callback(errorTags, server, pool);
    }

    return server.register({
      register: people,
      options: optionsPeople
    }, function (errorPeople) {
      if (errorPeople) {
        console.log('error people'); // eslint-disable-line

        return callback(errorPeople, server, pool);
      }

      return server.register({
        register: challenges,
        options: optionsChallenges
      }, function (errorChallenges) {
        if (errorChallenges) {
          console.log('error challenges'); //eslint-disable-line

          return callback(errorChallenges, server, pool);
        }
        server.route([
          {
            method: 'GET',
            path: '/people',
            handler: function (request, reply) {
              request.server.methods.pg.people.getAllPeople(request.query.active, function (error, response) { // eslint-disable-line
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
            path: '/peopleGetBy',
            handler: function (request, reply) {
              var columnName = request.query.column;
              var value = request.query.value;

              request.server.methods.pg.people.getBy(columnName, value, function (error, response) { // eslint-disable-line
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
            path: '/orgsGetByTag',
            handler: function (request, reply) {
              request.server.methods.pg.organisations.orgsGetByTag(request.query.active, request.query.tags, function (error, response) { // eslint-disable-line
                reply(response);
              });
            }
          },
          {
            method: 'GET',
            path: '/orgsGetDetails',
            handler: function (request, reply) {
              var id = request.query.id;

              request.server.methods.pg.organisations.getDetails(id, function (error, response) { // eslint-disable-line
                Hoek.assert(!error, 'orgs.getDetails error');
                reply(response);
              });
            }
          },
          {
            method: 'POST',
            path: '/updateOrg',
            handler: function (request, reply) {
              var id = request.query.id;
              var orgObj = request.payload;

              request.server.methods.pg.organisations.edit(id, orgObj, function (error, response) { // eslint-disable-line
                if (error && error.output && error.output.statusCode === 404) {
                  return reply(error.message).code(404);
                }
                Hoek.assert(!error, 'orgs.getDetails error');
                reply(response);
              });
            }
          },
          {
            method: 'POST',
            path: '/orgsAdd',
            handler: function (request, reply) {
              var orgObj = request.payload;

              request.server.methods.pg.organisations.add(orgObj, function (error, response) { // eslint-disable-line
                Hoek.assert(!error, 'orgs.add error');
                reply(response);
              });
            }
          },
          {
            method: 'GET',
            path: '/orgsToggleActive',
            handler: function (request, reply) {
              var orgId = request.query.id;

              request.server.methods.pg.organisations.toggleActive(orgId, function (error, response) { // eslint-disable-line
                if (error && error.output && error.output.statusCode === 404) {
                  return reply(error.output.payload.message).code(404);
                }
                Hoek.assert(!error, 'orgs.add error');
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
  });
}

module.exports = init;
