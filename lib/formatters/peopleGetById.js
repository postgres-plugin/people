'use strict';

/* eslint-enable */

module.exports = function (per) {
  var tags = [];
  var locations = [];
  var person = per[0];
    
  // if no per was found
  if (!person) {
    return [];
  }

  //tags
  tags = per.filter(function (p) {
    return Boolean(p.tags_id);
  }).map(function (p) {
    return { id: p.tags_id };
  }).reduce(function (unique, tag) {
    return unique.findIndex(e => e.id === tag.id) === -1 ? unique.concat(tag) : unique;
  }, []);

  //locations
  locations = per.filter(function (p) {
    return Boolean(p.locations_id);
  }).map(function (p) {
    return { id: p.locations_id };
  }).reduce(function (unique, tag) {
    return unique.findIndex(e => e.id === tag.id) === -1 ? unique.concat(tag) : unique;
  }, []);

  return [
    Object.assign(person, {
      person_id: person.person_id,
      person_name: person.person_name,
      person_logo_url: person.person_logo_url,
      person_mission_statement: person.person_mission_statement,
      person_active: person.person_active,
      tags: tags,
      locations: locations
    })
  ];
};
