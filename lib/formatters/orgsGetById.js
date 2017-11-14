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
    return o.tags_id;
  });

  //locations
  locations = org.filter(function (o) {
    return Boolean(o.locations_id);
  }).map(function(o) {
    return o.locations_id;
  });

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
