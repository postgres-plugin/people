'use strict';

module.exports = function (id) {
  return 'UPDATE people'
    + ' SET marketing = NOT people.marketing WHERE '
    + 'id = ' + id + ';';
};
