'use strict';

var getAllPeople = require('./getAllPeople.js');
var peopleGetBy = require('./peopleGetBy.js');
var orgsGetByTag = require('./orgsGetByTag.js');
var orgsGetDetails = require('./orgs/getDetails.js');
var orgsEdit = require('./orgs/edit.js');
var orgsAdd = require('./orgs/add.js');


module.exports = {
  getAllPeople: getAllPeople,
  peopleGetBy: peopleGetBy,
  orgsGetByTag: orgsGetByTag,
  orgsGetDetails: orgsGetDetails,
  orgsEdit: orgsEdit,
  orgsAdd: orgsAdd
};
