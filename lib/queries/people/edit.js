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
      values.push(key + ' = ' + literal(updatedProfile[key]));
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

function literal(val){
  if (null == val) return 'NULL';
  if (Number.isFinite(val)) return val.toString();
  if (Array.isArray(val)) {
    var vals = val.map(exports.literal)
    return "(" + vals.join(", ") + ")"
  }
  var backslash = ~val.indexOf('\\');
  var prefix = backslash ? 'E' : '';
  val = val.replace(/'/g, "''");
  val = val.replace(/\\/g, '\\\\');
  return prefix + "'" + val + "'";
};
