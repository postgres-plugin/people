'use strict';

var test = require('tape');
var query = require('../../../lib/queries/orgs/orgsGetByTag.js');

// orgsGetByTag(active, false)
// where:
// _active_ is true/false; if true, only active orgs will be returned (specifically for primary users)
// _filter_ is a tag's id; only orgs associated with this tag will be returned

// EXAMPLE RESULT FORMAT
// (1) Standard format for legitimate queries:
// result = {
//   filter: { id: 69, name: 'Design for disassembly' }, // OR `filter:null`
//   orgs: [ {
//     id: 5,
//     name: 'Co-op Group',
//     logo_url: 'https://www.google.co.uk/imgres?iitter.com%2Fcirculareconomy&docid=LnflHf1c&uact=8',
//     active: true
//   }, {
//     id: 4,
//     name: 'EMF',
//     logo_url: 'https://www.google.co.uk/imgres?iitter.com%2Fcirculareconomy&docid=LnflHf1c&uact=8',
//     active: true
//   } ]
// }
// (2) For non-existent queries:
// result = null >> or would we prefer [] ? TBC

var tagId = 69;

// for Admins, displaying all orgs
var allOrgs = query(false, false);
var expAllOrgs = [
  'SELECT',
  'organisations.id AS id,',
  'organisations.name AS name,',
  'organisations.logo_url AS logo_url,',
  'organisations.active AS active',
  'FROM organisations',
  'ORDER BY organisations.name ASC ;'
].join(' ');

// for Primary, displaying all active orgs
var allActiveOrgs = query(true, false);
var expAllActiveOrgs = [
  'SELECT',
  'organisations.id AS id,',
  'organisations.name AS name,',
  'organisations.logo_url AS logo_url,',
  'organisations.active AS active',
  'FROM organisations',
  'WHERE organisations.active IS NOT FALSE',
  'ORDER BY organisations.name ASC ;'
].join(' ');

// for Admins, displaying all active/inactive orgs, associated with tag 69
var filterAllOrgs = query(false, tagId);
var expFilterAllOrgs = [
  'SELECT',
  'tags.id AS tid,',
  'tags.name AS tname,',
  'organisations.id AS id,',
  'organisations.name AS name,',
  'organisations.logo_url AS logo_url,',
  'organisations.active AS active',
  'FROM organisations',
  'JOIN tags_organisations',
  'ON tags_organisations.organisations_id = organisations.id',
  'RIGHT OUTER JOIN tags',
  'ON tags_organisations.tags_id = tags.id',
  'WHERE tags.id = ' + tagId,
  'ORDER BY organisations.name ASC ;'
].join(' ');

var filterActiveOrgs = query(true, tagId);
var expFilterActiveOrgs = [
  'SELECT',
  'tags.id AS tid,',
  'tags.name AS tname,',
  'organisations.id AS id,',
  'organisations.name AS name,',
  'organisations.logo_url AS logo_url,',
  'organisations.active AS active',
  'FROM organisations',
  'JOIN tags_organisations',
  'ON tags_organisations.organisations_id = organisations.id',
  'RIGHT OUTER JOIN tags',
  'ON tags_organisations.tags_id = tags.id',
  'WHERE tags.id = ' + tagId,
  'AND organisations.active IS NOT FALSE',
  'ORDER BY organisations.name ASC ;'
].join(' ');

test('getByTag function works for all scenarios', function (t) {
  t.equal(allOrgs, expAllOrgs, 'admin: return all orgs, no tag selected');
  t.equal(allActiveOrgs, expAllActiveOrgs, 'primary: return all active orgs, no tags selected');
  t.equal(filterAllOrgs, expFilterAllOrgs, 'admin: return all orgs associated with tag ' + tagId);
  t.equal(filterActiveOrgs, expFilterActiveOrgs, 'primary: return all active orgs associated with tag ' + tagId);
  t.end();
})
