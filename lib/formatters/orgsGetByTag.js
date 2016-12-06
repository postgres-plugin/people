'use strict';

module.exports = function (data) {
  var orgs = []; // if no orgs (only tag name) returned
  var filter = data[0].tid
    ? {
      id: data[0].tid,
      name: data[0].tname
    } : null;

  if (data[0].id) {
    orgs = data.map(function (row) {
      return {
        id: row.id,
        name: row.name,
        logo_url: row.logo_url,
        active: row.active
      };
    });
  }

  return { filter: filter, orgs: orgs };
};
