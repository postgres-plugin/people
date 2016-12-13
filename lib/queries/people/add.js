var escape = require('pg-escape');

var allKeys = ['first_name', 'last_name', 'user_type', 'email', 'job_title', 'phone', 'org_id'];

function getValues (user) {
  return allKeys.map(function (key) {
    var value = user[key];

    if (key === 'org_id') {
      // in the form, -1 represents no organisation, so we convert to null for postgres
      return value === -1 ? 'null' : value;
    }

    return value === '' ? 'null' : escape.literal(value);
  });
}

module.exports = function (user) {
  return [
    'INSERT INTO people (',
    'active, account_activated, ' + allKeys.join(', '),
    ')',
    'SELECT TRUE, FALSE, ' + getValues(user).join(', '),
    'RETURNING people.org_id, people.id,',
    '(',
    'SELECT name FROM organisations',
    'WHERE organisations.id = ' + user.org_id,
    ') AS org_name;'
  ].join(' ');
}
