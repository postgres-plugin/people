'use strict';

/* eslint-enable */

module.exports = function (org) {
  var tags = [];
  var locations = [];
  var organisation = org[0];

  // if no org was found
  if (!organisation) {
    return [];
  }

  //tags
  tags = org.filter(function (o) {
    return Boolean(o.tags_id);
  }).map(function(o) {
    return {id: o.tags_id};
  }).reduce(function(unique, tag) {
    return unique.findIndex(e => e.id === tag.id) === -1 ? unique.concat(tag) : unique;
  }, []);

  //locations
  locations = org.filter(function (o) {
    return Boolean(o.locations_id);
  }).map(function(o) {
    return {id: o.locations_id};
  }).reduce(function(unique, tag) {
    return unique.findIndex(e => e.id === tag.id) === -1 ? unique.concat(tag) : unique;
  }, []);

  return [
    {
      org_id: organisation.org_id,
      org_name: organisation.org_name,
      org_logo_url: organisation.org_logo_url,
      org_mission_statement: organisation.org_mission_statement,
      org_active: organisation.org_active,
      tags: tags,
      locations: locations
    }
  ];
};
