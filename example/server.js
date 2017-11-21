'use strict';

var Hapi = require('hapi');
var pg = require('pg');
var Hoek = require('hoek');
// pg plugins
var people = require('../lib/index.js');
var tags = require('tags-system');
var challenges = require('pg-challenges');

// pg tables data
var data = require('ce100-mock-data');

function init (config, callback) {
  var server = new Hapi.Server();
  var pool = new pg.Pool(config.pg);
  var optionsTags = {
    reset: true,
    tags: data.tags,
    categories: data.categories,
    pool: pool
  };
  var optionsPeople = {
    pool: pool,
    reset: true,
    people: data.people,
    organisations: data.organisations,
    tags_organisations: data.tags_organisations
  };
  var optionsChallenges = {
    pool: pool,
    reset: true,
    challenges: data.challenges,
    tags_challenges: data.tags_challenges
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
              var activeNonAdmin = request.query.active === 'true';

              request.server.methods.pg.people.getAllPeople(activeNonAdmin, function (error, response) { // eslint-disable-line
                Hoek.assert(!error, 'people.getAllPeople error');
                reply(response);
              });
            }
          },
          {
            method: 'GET',
            path: '/peopleGetById',
            handler: function (request, reply) {
              request.server.methods.pg.people.getBy('id', request.query.id, function (error, response) { // eslint-disable-line
                Hoek.assert(!error, 'people.getById error');
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
                Hoek.assert(!error, 'people.getBy error');
                reply(response);
              });
            }
          },
          {
            method: 'GET',
            path: '/peopleAddPassword',
            handler: function (request, reply) {
              var id = request.query.id;
              var password = request.query.password;

              request.server.methods.pg.people.addPassword(id, password, function (error, response) { // eslint-disable-line
                Hoek.assert(!error, 'people.addPassword error');
                reply(response);
              });
            }
          },
          {
            method: 'POST',
            path: '/peopleEdit',
            handler: function (request, reply) {
              var id = request.query.id;
              var profileUpdate = request.payload;

              request.server.methods.pg.people.edit(id, profileUpdate, function (error, response) { // eslint-disable-line
                Hoek.assert(!error, 'people.edit error');

                return reply(response);
              });
            }
          },
          {
            path: '/peopleAdd',
            method: 'POST',
            handler: function (request, reply) {
              var user = request.payload;

              request.server.methods.pg.people.add(user, function (error, response) { // eslint-disable-line
                if (error) {
                  return reply().code(500);
                }
                reply(response);
              });
            }
          },
          {
            method: 'POST',
            path: '/peopleToggleActive',
            handler: function (request, reply) {
              var id = request.query.id;

              request.server.methods.pg.people.toggleActive(id, function (error, response) { // eslint-disable-line
                Hoek.assert(!error, 'people.toggleActive error');
                reply(response);
              });
            }
          },
          {
            method: 'GET',
            path: '/addOrgName/{name}',
            handler: function (request, reply) {
              request.server.methods.pg.organisations.addOrgName(request.params.name, function (error, response) { // eslint-disable-line
                Hoek.assert(!error, 'orgs.addOrgName error');
                reply('error' + error + 'response' + response);
              });
            }
          },
          {
            method: 'GET',
            path: '/orgsGetByTag',
            handler: function (request, reply) {
              request.server.methods.pg.organisations.orgsGetByTag(request.query.active, request.query.tags, function (error, response) { // eslint-disable-line
                if (error) {
                  return reply(error);
                }

                return reply(response);
              });
            }
          },
          {
            method: 'GET',
            path: '/orgsGetActive',
            handler: function (request, reply) {
              request.server.methods.pg.organisations.getActive(function (error, response) { // eslint-disable-line
                if (error) {
                  return reply(error);
                }

                return reply(response);
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
                Hoek.assert(!error, 'orgs.edit error');
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
                Hoek.assert(!error, 'orgs.toggleActive error');
                reply(response);
              });
            }
          },
          {
            method: 'GET',
            path: '/orgsSearch',
            handler: function (request, reply) {
              var searchTerm = request.query.searchTerm;
              request.server.methods.pg.organisations.orgsSearch(searchTerm, [], [], function (error, response) { // eslint-disable-line
                Hoek.assert(!error, 'orgs.orgsSearch error');

                return reply(response);
              });
            }
          },
          {
            method: 'GET',
            path: '/orgsGetById',
            handler: function (request, reply) {
              var id = request.query.id;

              request.server.methods.pg.organisations.orgsGetById(id, function (error, response) { // eslint-disable-line
                Hoek.assert(!error, 'orgs.orgsGetById error');
                reply(response);
              });
            }
          },
          {
            method: 'GET',
            path: '/orgsGetTags',
            handler: function (request, reply) {
              var id = request.query.id;

              request.server.methods.pg.organisations.orgsGetTags(id, function (error, response) { // eslint-disable-line
                Hoek.assert(!error, 'orgs.orgsGetTag error');
                reply(response);
              });
            }
          },
          {
            method: 'GET',
            path: '/peopleSearch',
            handler: function (request, reply) {
              var searchTerm = request.query.searchTerm;

              request.server.methods.pg.people.peopleSearch(searchTerm, function (error, response) { // eslint-disable-line
                Hoek.assert(!error, 'orgs.orgsSearch error');
                reply(response);
              });
            }
          },
          {
            method: 'GET',
            path: '/peopleGetByOrgId',
            handler: function (request, reply) {
              var orgId = request.query.orgId;

              request.server.methods.pg.people.peopleGetByOrgId(orgId, function (error, response) { // eslint-disable-line
                Hoek.assert(!error, 'people.peopleGetByOrgId error');
                reply(response);
              });
            }
          },
          {
            method: 'POST',
            path: '/updateLastLogin',
            handler: function (request, reply) {
              var id = request.query.id;
              var timestamp = request.query.timestamp
              request.server.methods.pg.people.updateLastLogin(id, timestamp, function (error, response) { // eslint-disable-line
                Hoek.assert(!error, 'people.updateLasLogin error');
                reply(response);
              });
            }
          },
          {
            method: 'GET',
            path: '/orgsGetAll',
            handler: function (request, reply) {
              request.server.methods.pg.organisations.orgsGetAll(function (error, response) { // eslint-disable-line
                Hoek.assert(!error, 'orgsGetAll error');
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
