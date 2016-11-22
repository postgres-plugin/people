'use strict';

/**
* if not already defined add pg.people object
*/

module.exports = function (request) {
  if (request.pg) {
    request.pg.people = {};
  } else {
    request.pg = { people: {} };
  }

  return request;
};
