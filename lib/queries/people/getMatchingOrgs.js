module.exports = function(id) {
  return [
    "SELECT DISTINCT (organisations.id) AS org_id, COUNT(tags_organisations.tags_id) AS tag_count,",
    "organisations.logo_url AS org_logo_url, organisations.name AS org_name",
    "FROM tags_people t1",
    "JOIN people p1",
    "ON p1.id = t1.person_id",
    "JOIN tags_organisations",
    "ON tags_organisations.tags_id = t1.tags_id",
    "JOIN organisations",
    "ON organisations.id = tags_organisations.organisations_id",
    "AND organisations.id != p1.org_id",
    "WHERE p1.id = " + id,
    "GROUP BY organisations.id, organisations.name",
    "ORDER BY tag_count DESC"
  ].join(" ");
};
