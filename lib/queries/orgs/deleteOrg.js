'use strict';

module.exports = function (id) {
  return 'DELETE FROM orgs '
  + 'WHERE org.id IN '
  + '(SELECT org.id FROM org '
  + 'FULL JOIN users '
  + 'ON users.creator_id = org.id '
  + 'WHERE org.id = ' + id
  + ' GROUP BY org.id '
  + 'HAVING COUNT(users) = 0;';
};
