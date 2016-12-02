'use strict';

var escape = require('pg-escape');

var fields = ['name', 'logo_url', 'mission_statement'];

module.exports = function (id, orgObj) {
  var newValues = fields.reduce(function (arr, key) {
    if (orgObj[key]) {
      return arr.concat(key + ' = ' + escape.literal(orgObj[key]));
    }

    return arr;
  }, []).join(', ');

  return [
    'UPDATE',
    'organisations',
    'SET ',
    newValues,
    'WHERE ',
    'id = 1',
    ';'
  ].join(' ');
};

// var orgObj = {
//   mission_statement: 'we are the world',
//   name: 'hallalula'
// }
// UPDATE organisations SET  name = 'hallalula', mission_statement = 'we are the world' WHERE  id = 1 ;
