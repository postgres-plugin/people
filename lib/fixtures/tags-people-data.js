"use strict";

/**
 * Convert an array of tags-people object to a sql insert command
 */

module.exports = function(tags_people) {
  var result = "";
  var values = "";

  if (tags_people && tags_people.length > 0) {
    values = tags_people
      .map(function(to) {
        return "(" + to.tags_id + ", " + to.person_id + ")";
      })
      .join(",");

    result =
      "INSERT INTO tags_people (" +
      "tags_id, " +
      "person_id" +
      ") VALUES " +
      values +
      ";";
  }
  return result;
};
