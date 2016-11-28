'use strict';

var getAllPeople = require('./getAllPeople.js');
var peopleGetBy = require('./peopleGetBy.js');
var addOrgName = require('./addOrgName.js');
var getActiveOrgs = require('./getActiveOrgs.js');

module.exports = {
  getAllPeople: getAllPeople,
  peopleGetBy: peopleGetBy,
  addOrgName: addOrgName,
  getActiveOrgs: getActiveOrgs
};
