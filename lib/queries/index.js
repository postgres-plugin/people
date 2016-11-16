'use strict';

var addUser = require('./addUser.js');
var addOrganisation = require('./addOrganisation.js');
var getUser = require('./getUser.js');
var getOrganisation = require('./getOrganisation.js');

module.exports = {
  addUser: addUser,
  addOrganisation: addOrganisation,
  getUser: getUser
  getOrganisation: getOrganisation
};
