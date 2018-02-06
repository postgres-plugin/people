'use strict';

module.exports = function (id) {
  return 'UPDATE people'
    + ' SET marketing = true WHERE '
    + 'id = ' + id + ';';
};
