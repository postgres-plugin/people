'use strict';

module.exports = function (id, timestamp) {
  var query = [
    'UPDATE people',
    'SET last_login = ' + timestamp,
    'WHERE id = ' + id + ';'
  ];

  return query.join(' ');
};
