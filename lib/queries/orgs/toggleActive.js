'use strict';

module.exports = function (id) {
  return 'UPDATE organisations'
    + ' SET active = NOT organisations.active WHERE '
    + 'id = ' + id + ';';
};
