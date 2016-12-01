'use strict';

module.exports = function (data) {
  var filter_tag = data[0].filter_tag || false;
  var orgs = data.map(function (row) {
    return {
      id: row.id,
      name: row.name,
      logo_url: row.logo_url,
      active: row.active
    };
  });

  return { filter_tag: filter_tag, orgs: orgs };
};
