'use strict';

var getAllPeople = require('./people/getAllPeople.js');
var orgsGetByTag = require('./orgs/orgsGetByTag.js');
var orgsGetDetails = require('./orgs/getDetails.js');
var orgsToggleActive = require('./orgs/toggleActive.js');
var orgsEdit = require('./orgs/edit.js');
var orgsAdd = require('./orgs/add.js');
var orgsGetActive = require('./orgs/getActive.js');
var orgSearch = require('./orgs/search.js')
var peopleAddPassword = require('./people/addPassword.js');
var peopleEdit = require('./people/edit.js');
var peopleAdd = require('./people/add.js');
var peopleGetBy = require('./people/peopleGetBy.js');
var peopleToggleActive = require('./people/toggleActive.js');

module.exports = {
  getAllPeople: getAllPeople,
  peopleGetBy: peopleGetBy,
  peopleAdd: peopleAdd,
  peopleAddPassword: peopleAddPassword,
  peopleEdit: peopleEdit,
  peopleToggleActive: peopleToggleActive,
  orgsGetByTag: orgsGetByTag,
  orgsGetDetails: orgsGetDetails,
  orgsAdd: orgsAdd,
  orgsToggleActive: orgsToggleActive,
  orgsEdit: orgsEdit,
  orgsGetActive: orgsGetActive,
  orgSearch: orgSearch
};
