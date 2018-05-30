module.exports = function(id) {
  return [
    "SELECT DISTINCT (challenges.id) AS chal_id, COUNT(tags_challenges.tags_id) AS tag_count,",
    "challenges.title AS chal_title, challenges.org_id, organisations.name AS org_name",
    "FROM tags_people t1",
    "JOIN people p1",
    "ON p1.id = t1.person_id",
    "JOIN tags_challenges",
    "ON tags_challenges.tags_id = t1.tags_id",
    "JOIN challenges",
    "ON challenges.id = tags_challenges.challenges_id",
    "JOIN organisations on organisations.id = challenges.org_id",
    "AND challenges.creator_id != " + id,
    "WHERE p1.id = " + id,
    "GROUP BY challenges.id, organisations.name",
    "ORDER BY tag_count DESC"
  ].join(" ");
};
