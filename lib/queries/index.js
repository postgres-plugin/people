'use strict';

var getAllPeople = require('./getAllPeople.js');
var peopleGetBy = require('./peopleGetBy.js');
var addOrgName = require('./addOrgName.js');
var orgsGetByTag = require('./orgsGetByTag.js');
var orgsGetDetails = require('./orgs/getDetails.js');

module.exports = {
  getAllPeople: getAllPeople,
  peopleGetBy: peopleGetBy,
  addOrgName: addOrgName,
  orgsGetByTag: orgsGetByTag,
  orgsGetDetails: orgsGetDetails
};
