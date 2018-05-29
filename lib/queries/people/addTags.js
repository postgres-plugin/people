'use strict';

var addTags = require('../addTags.js');

function addPeopleTags (itemId, tagIds) {
  return addTags(itemId, tagIds, 'tags_people', 'person_id')
}

module.exports = addPeopleTags;
