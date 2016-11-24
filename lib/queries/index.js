'use strict';

var getAllPeople = require('./getAllPeople.js');
var getByEmail = require('./getByEmail.js');
var addOrgName = require('./addOrgName.js');
var getActiveOrgs = require('./getActiveOrgs.js');

module.exports = {
  getAllPeople: getAllPeople,
  getByEmail: getByEmail,
  addOrgName: addOrgName,
  getActiveOrgs: getActiveOrgs
};
