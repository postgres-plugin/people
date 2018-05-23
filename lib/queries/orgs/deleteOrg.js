'use strict';

module.exports = function (id) {
  return 'DELETE FROM organisations '
  + 'WHERE organisations.id IN '
  + '(SELECT organisations.id FROM organisations '
  + 'FULL JOIN people '
  + 'ON people.org_id = organisations.id '
  + 'WHERE organisations.id = ' + id
  + ' GROUP BY organisations.id '
  + 'HAVING COUNT(people) = 0);';
};
