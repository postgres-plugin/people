'use strict';

module.exports = function (id) {
  return 'UPDATE people'
    + ' SET consent = true WHERE '
    + 'id = ' + id + ';';
};
