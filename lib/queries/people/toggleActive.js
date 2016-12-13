'use strict';

module.exports = function (id) {
  return 'UPDATE people'
    + ' SET active = NOT people.active WHERE '
    + 'id = ' + id + ';';
};
