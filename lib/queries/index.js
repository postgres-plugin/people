'use strict';

var getAllPeople = require('./getAllPeople.js');
var peopleGetBy = require('./peopleGetBy.js');
var orgsGetByTag = require('./orgsGetByTag.js');
var orgsGetDetails = require('./orgs/getDetails.js');
var orgsToggleActive = require('./orgs/toggleActive.js');
var orgsEdit = require('./orgs/edit.js');
var orgsAdd = require('./orgs/add.js');
var orgsGetActive = require('./orgs/getActive.js');

module.exports = {
  getAllPeople: getAllPeople,
  peopleGetBy: peopleGetBy,
  orgsGetByTag: orgsGetByTag,
  orgsGetDetails: orgsGetDetails,
  orgsAdd: orgsAdd,
  orgsToggleActive: orgsToggleActive,
  orgsEdit: orgsEdit,
  orgsGetActive: orgsGetActive
};
