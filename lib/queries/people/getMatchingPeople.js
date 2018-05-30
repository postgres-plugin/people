module.exports = function(id) {
  return [
    "SELECT DISTINCT (p2.id), COUNT(t2.tags_id) AS tag_count,",
    "p2.first_name, p2.last_name, p2.logo_url, p2.org_id, organisations.name AS org_name, p2.phone, p2.email, p2.job_title",
    "FROM tags_people t1",
    "JOIN people p1",
    "ON p1.id = t1.person_id",
    "JOIN tags_people t2 ON t2.tags_id = t1.tags_id",
    "JOIN people p2",
    "ON p2.id = t2.person_id",
    "FULL JOIN organisations on organisations.id = p2.org_id",
    "WHERE p1.id = " + id,
    "AND p2.id != " + id,
    "GROUP BY p2.id, organisations.name",
    "ORDER BY tag_count DESC"
  ].join(" ");
};
