'use strict';

var Boom = require('boom');

// CURRENTLY ONLY CHECKS EACH KEY HAS A VALUE >> need to be more specific?
module.exports = function (fields, profile, cb) {
  var valuesExist = 0;
  var msg;

  if (Object.keys(profile).length === 0) {
    return cb(Boom.badRequest('Please check your request.'), null);
  }

  return fields.forEach(function (field, index) {
    if (!profile[field]) {
      return valuesExist;
    }

    if (index === fields.length - 1) {
      if (valuesExist !== fields.length - 1) {
        msg = 'Please ensure all fields are correctly filled.';

        return cb(Boom.badRequest(msg), null);
      }

      return cb(null, true);
    }

    return valuesExist++;
  });
};
