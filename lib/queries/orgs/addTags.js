'use strict';

var addTags = require('../addTags.js');

function addOrgTags (itemId, tagIds) {
  return addTags(itemId, tagIds, 'tags_organisations', 'organisations_id')
}

module.exports = addOrgTags;
