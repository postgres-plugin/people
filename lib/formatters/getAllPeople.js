'use strict';

/* eslint-enable */

module.exports = function (per) {
  var tags = [];
  var locations = [];
  var people = per.map(person => {

    
    // if no per was found
    if (!person) {
      return [];
    }
  
    //tags
    tags = person.tags ? person.tags.split(",") : [];
    return Object.assign(person, {
        person_id: person.id,
        person_name: person.first_name + person.last_name,
        person_logo_url: person.logo_url,
        person_active: person.active,
        tags: tags,
        locations: locations
      })
  })
  return people;
};

