module.exports = function(id) {
  return [
    "SELECT DISTINCT (p2.id),",
    "p2.first_name, p2.last_name, p2.logo_url, p2.org_id, p2.phone, p2.email",
    "FROM tags_people t1",
    "JOIN people p1",
    "ON p1.id = t1.person_id",
    "JOIN tags_people t2 ON t2.tags_id = t1.tags_id",
    "JOIN people p2",
    "ON p2.id = t2.person_id",
    "AND p2.id != " + id,
    "WHERE p1.id = " + id
  ].join(" ");
};
