'use strict';

/* eslint-disable */


// org_id |  org_name  | primary_id | primary_first_name |  org_tag_name  | org_tag_id |  challenge_title   | challenge_tag_name | challenge_tag_id | challenge_id
// --------+------------+------------+--------------------+----------------+------------+--------------------+--------------------+------------------+--------------
//      1 | Apple AAAA |          3 | Sally              | Global Partner |          1 | Challenge Number 2 | Corporate          |                2 |            2
//      1 | Apple AAAA |          3 | Sally              | Global Partner |          1 | Challenge Number 3 | Waste to energy    |               49 |            3
//      1 | Apple AAAA |          3 | Sally              | Global Partner |          1 | Challenge Number 3 | Buildings design   |              105 |            3
//      1 | Apple AAAA |          3 | Sally              | Global Partner |          1 | Challenge Number 3 | Fertiliser         |               85 |            3
//      1 | Apple AAAA |          3 | Sally              | UK             |         27 | Challenge Number 2 | Corporate          |                2 |            2
//      1 | Apple AAAA |          3 | Sally              | UK             |         27 | Challenge Number 3 | Waste to energy    |               49 |            3
//      1 | Apple AAAA |          3 | Sally              | UK             |         27 | Challenge Number 3 | Buildings design   |              105 |            3
//      1 | Apple AAAA |          3 | Sally              | UK             |         27 | Challenge Number 3 | Fertiliser         |               85 |            3


 // var rowss = [{
 //    org_id: 1,
 //    org_name: 'Apple AAAA',
 //    primary_id: 3,
 //    primary_first_name: 'Sally',
 //    org_tag_name: 'Global Partner',
 //    org_tag_id: 1,
 //    challenge_title: 'Challenge Number 2',
 //    challenge_tag_name: 'Corporate',
 //    challenge_tag_id: 2,
 //    challenge_id: 2
 //  }, {
 //    org_id: 1,
 //    org_name: 'Apple AAAA',
 //    primary_id: 3,
 //    primary_first_name: 'Sally',
 //    org_tag_name: 'Global Partner',
 //    org_tag_id: 1,
 //    challenge_title: 'Challenge Number 3',
 //    challenge_tag_name: 'Waste to energy',
 //    challenge_tag_id: 49,
 //    challenge_id: 3
 //  }, {
 //    org_id: 1,
 //    org_name: 'Apple AAAA',
 //    primary_id: 3,
 //    primary_first_name: 'Sally',
 //    org_tag_name: 'Global Partner',
 //    org_tag_id: 1,
 //    challenge_title: 'Challenge Number 3',
 //    challenge_tag_name: 'Buildings design',
 //    challenge_tag_id: 105,
 //    challenge_id: 3
 //  }, {
 //    org_id: 1,
 //    org_name: 'Apple AAAA',
 //    primary_id: 3,
 //    primary_first_name: 'Sally',
 //    org_tag_name: 'Global Partner',
 //    org_tag_id: 1,
 //    challenge_title: 'Challenge Number 3',
 //    challenge_tag_name: 'Fertiliser',
 //    challenge_tag_id: 85,
 //    challenge_id: 3
 //  }, {
 //    org_id: 1,
 //    org_name: 'Apple AAAA',
 //    primary_id: 3,
 //    primary_first_name: 'Sally',
 //    org_tag_name: 'UK',
 //    org_tag_id: 27,
 //    challenge_title: 'Challenge Number 2',
 //    challenge_tag_name: 'Corporate',
 //    challenge_tag_id: 2,
 //    challenge_id: 2
 //  }, {
 //    org_id: 1,
 //    org_name: 'Apple AAAA',
 //    primary_id: 3,
 //    primary_first_name: 'Sally',
 //    org_tag_name: 'UK',
 //    org_tag_id: 27,
 //    challenge_title: 'Challenge Number 3',
 //    challenge_tag_name: 'Waste to energy',
 //    challenge_tag_id: 49,
 //    challenge_id: 3
 //  }, {
 //    org_id: 1,
 //    org_name: 'Apple AAAA',
 //    primary_id: 3,
 //    primary_first_name: 'Sally',
 //    org_tag_name: 'UK',
 //    org_tag_id: 27,
 //    challenge_title: 'Challenge Number 3',
 //    challenge_tag_name: 'Buildings design',
 //    challenge_tag_id: 105,
 //    challenge_id: 3
 //  }, {
 //    org_id: 1,
 //    org_name: 'Apple AAAA',
 //    primary_id: 3,
 //    primary_first_name: 'Sally',
 //    org_tag_name: 'UK',
 //    org_tag_id: 27,
 //    challenge_title: 'Challenge Number 3',
 //    challenge_tag_name: 'Fertiliser',
 //    challenge_tag_id: 85,
 //    challenge_id: 3
 //  } ]
 //



  // Looking for something of the following form:
  // { org: {id, name, mission, url, tags: [{tag_name, tag_id}, ...]}
  // , primary: {id, first_name, }
  // , challenges: [{id, title, tags: [{tag_name, tag_id}, ...]}]
  // }

/*
  {
    "org": {
      "id": 1,
      "name": "Apple AAAA",
      "logo_url": "https://www.google.co.uk/imgres?iitter.com%2Fcirculareconomy&docid=LnflHf1c&uact=8",
      "mission_statement": "Change the economy"
    },
    "primary": {
      "first_name": "Sally",
      "last_name": "Robbins",
      "id": "07111111111",
      "email": "sa@ro.co",
      "job_title": "Athlete"
    },
    "challenges": [
      {
        "id": 2,
        "title": "Challenge Number 2",
        "description": "how can i...",
        "tags": [
          {
            "tag_id": 2,
            "tag_name": "Corporate"
          }
        ]
      },
      {
        "id": 3,
        "title": "Challenge Number 3",
        "description": "how can i...",
        "tags": [
          {
            "tag_id": 49,
            "tag_name": "Waste to energy"
          },
          {
            "tag_id": 105,
            "tag_name": "Buildings design"
          },
          {
            "tag_id": 85,
            "tag_name": "Fertiliser"
          }
        ]
      }
    ]
  }
*/


module.exports = function (rows) {
  var org = {}; // { id, name, tags: [id,id,id] }
  var organisation_tags = {}; // {tag_id: {tagobj}, tag_id: {} ... }
  var challenge_tags = {}; // {challengeId: {tag_id: {tagobj}, tag_id: {tagobj} }, ... };
  var challenge_tags_order = {}; // {challengeId: {tag_id: {tagobj}, tag_id: {tagobj} }, ... };
  var primary = {};
  var challenges = {}; // { challenge_id: {id, title, tags: [ID, ID, ID]}, challenge_id: {id, title, tags: [ID, ID, ID]}}
  var challenges_order = [];
  rows.forEach(function (row) {
    // if this is the first row, create the org and primary objects
    if (!org.id) {
      org.id = row.org_id;
      org.name = row.org_name;
      org.logo_url = row.org_logo_url;
      org.mission_statement = row.org_mission_statement;
      org.active = row.org_active;
      org.tags = [];
      primary.first_name = row.primary_first_name;
      primary.last_name = row.primary_last_name;
      primary.id = row.primary_id;
      primary.phone = row.primary_phone;
      primary.email = row.primary_email;
      primary.job_title = row.primary_job_title;
    }
    // if there is an organisation tag and it has not yet been added
    if (row.org_tag_id && !organisation_tags[row.org_tag_id]) {
      // add tag to organisation_tags object if it is new
      organisation_tags[row.org_tag_id] = { tag_name: row.org_tag_name, tag_id: row.org_tag_id };
      // add tag to the order array in orgs to allow us to preserve order
      org.tags.push(row.org_tag_id)
    }

    var chal_id = row.challenge_id;
    // if a challenge exists, and it is a new challenge
    if (chal_id && !challenges[chal_id]) {
      // add it to the challenges object, referenced by id
      challenges[chal_id] = {id: chal_id, title: row.challenge_title, description: row.challenge_description, tags: [] };
      // we also want to add this challenge id to the challenge_tags obj
      challenge_tags[chal_id] = {};
      // And add the challenge id to the order array to preserve order
      challenges_order.push(chal_id)
    }
    // if this row contains a challenge tag and it is a new to this particular challenge
    if (row.challenge_tag_id && !challenge_tags[chal_id][row.challenge_tag_id]) {
      // add this tag object to the correct challenge in the challenge_tags object
      challenge_tags[chal_id][row.challenge_tag_id] = {tag_id: row.challenge_tag_id, tag_name: row.challenge_tag_name };
      // add the tag id to the appropriate challenge so that we can preserve order of the tags
      challenges[chal_id].tags.push(row.challenge_tag_id);
    }
  })

  var orgTagsArray = org.tags.map(function (tagId) {
    return organisation_tags[tagId]
  });
  org.tags = orgTagsArray

  var chalArray = challenges_order.map(function (chid) {
    var tags = challenges[chid].tags.map(function (tid) {
      return challenge_tags[chid][tid]
    });
    var chalWithTags = Object.assign({}, challenges[chid], {tags: tags});
    return chalWithTags;
  });

  var formatted = {
    org: org,
    primary: primary,
    challenges: chalArray
  };

  return formatted;
};
