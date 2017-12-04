'use strict';

var escape = require('pg-escape');

module.exports = function (userId, updatedProfile) {
  var values = [];

  Object.keys(updatedProfile).forEach(function (key) {
    if (key === 'org_id' || key === 'notification_email') {
      values.push(
        key
        + ' = '
        + (updatedProfile[key] === -1 ? 'null' : updatedProfile[key])
      );
    } else {
      values.push(key + ' = ' + escape.literal(updatedProfile[key]));
    }
  });

  return [
    'UPDATE',
    'people',
    'SET',
    values.join(', '),
    'WHERE',
    'id = ' + userId,
    ';'
  ].join(' ');
};
