'use strict';

module.exports = function (id) {
  return 'DELETE FROM people '
  + 'WHERE people.id IN '
  + '(SELECT people.id FROM people '
  + 'FULL JOIN challenges '
  + 'ON challenges.creator_id = people.id '
  + 'FULL JOIN comments '
  + 'ON comments.author_id = people.id ' 
  + 'WHERE people.id = ' + id
  + ' GROUP BY people.id '
  + 'HAVING COUNT(challenges) = 0 '
  + 'AND COUNT(comments) = 0);';
};
