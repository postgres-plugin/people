'use strict';

module.exports = function(orgs) {
  var orgsWithTags = groupTagsAndLocations(orgs);

  return orgsToArray(orgsWithTags);
}

function groupTagsAndLocations(orgs) {
  var res = {};
  orgs.forEach(function(org) {
    if(!res[org.org_id]) {
      res[org.org_id] = {
        org_id: org.org_id,
        org_name: org.org_name,
        org_logo_url: org.org_logo_url,
        org_active: org.org_active,
        tags: [], locs: []
      };
      org.tag_id && res[org.org_id].tags.push(org.tag_id);
      org.location_id && res[org.org_id].locs.push(org.location_id);
    } else {
      (org.tag_id && !res[org.org_id].tags.includes(org.tag_id)) && res[org.org_id].tags.push(org.tag_id);
      (org.location_id && !res[org.org_id].locs.includes(org.location_id)) && res[org.org_id].locs.push(org.location_id);
    }
  });
  return res;
}

function orgsToArray(orgs) {
  var res = [];
  Object.keys(orgs).forEach(function(id) {
    res.push(orgs[id]);
  });
  return res.sort(function(o1, o2) {
    if (o1.orgn_name < o2.org_name) return -1;
    if (o1.org_name > o2.org_name) return 1;
    return 0;
  });
}
