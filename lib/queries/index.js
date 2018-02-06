'use strict';

var getAllPeople = require('./people/getAllPeople.js');
var orgsGetByTag = require('./orgs/orgsGetByTag.js');
var orgsGetDetails = require('./orgs/getDetails.js');
var orgsToggleActive = require('./orgs/toggleActive.js');
var orgsEdit = require('./orgs/edit.js');
var orgsAdd = require('./orgs/add.js');
var orgsGetActive = require('./orgs/getActive.js');
var orgSearch = require('./orgs/search.js');
var orgGetById = require('./orgs/getById.js');
var orgGetTags = require('./orgs/getTags.js');
var peopleAddPassword = require('./people/addPassword.js');
var peopleEdit = require('./people/edit.js');
var peopleAdd = require('./people/add.js');
var peopleGetBy = require('./people/peopleGetBy.js');
var peopleToggleActive = require('./people/toggleActive.js');
var peopleSearch = require('./people/search.js');
var peopleGetByOrgId = require('./people/getByOrgId.js');
var updateLastLogin = require('./people/updateLastLogin.js');
var orgsAddTags = require('./orgs/addTags.js');
var orgsAddLocations = require('./orgs/addLocations.js');
var orgsGetAll = require('./orgs/getAll.js');
var getUsedLocationsIds = require('./orgs/getUsedLocationIds.js');
var peopleConsent = require('./people/consent.js');
var peopleMarketing = require('./people/marketing.js');


module.exports = {
  getAllPeople: getAllPeople,
  peopleGetBy: peopleGetBy,
  peopleAdd: peopleAdd,
  peopleAddPassword: peopleAddPassword,
  peopleEdit: peopleEdit,
  peopleToggleActive: peopleToggleActive,
  peopleSearch: peopleSearch,
  peopleGetByOrgId: peopleGetByOrgId,
  updateLastLogin: updateLastLogin,
  orgsGetByTag: orgsGetByTag,
  orgsGetDetails: orgsGetDetails,
  orgsAdd: orgsAdd,
  orgsToggleActive: orgsToggleActive,
  orgsEdit: orgsEdit,
  orgsGetActive: orgsGetActive,
  orgSearch: orgSearch,
  orgGetById: orgGetById,
  orgGetTags: orgGetTags,
  orgsAddTags: orgsAddTags,
  orgsAddLocations: orgsAddLocations,
  orgsGetAll: orgsGetAll,
  getUsedLocationsIds: getUsedLocationsIds,
  peopleConsent: peopleConsent,
  peopleMarketing: peopleMarketing
};
