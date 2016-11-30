'use strict';

/* eslint-disable */

module.exports = function (orgId) {
  // -- OUTER QUERY DEALS WITH ORGANISATION DETAILS, PRIMARY USER
  // -- ORGANISATION TAGS
  return [
    'SELECT ',
    'organisations.id as org_id,',
    'organisations.name as org_name,',
    'people.id as primary_id,',
    'people.first_name as primary_first_name,',
    'tags.name as org_tag_name,',
    'tags.id as org_tag_id,',
    'chal.chal_title as challenge_title,',
    'chal.tag_name as challenge_tag_name,',
    'chal.tag_id as challenge_tag_id',
    'FROM (',
    // '-- SUB QUERY GETS ALL ACTIVE CHALLENGES RELATED TO GIVEN ORG',
      'SELECT ',
      'challenges.title as chal_title,',
      'challenges.id as chal_id,',
      'tags.name as tag_name,',
      'tags.id as tag_id',
      'FROM challenges',
      'JOIN tags_challenges',
      'ON challenges.id = tags_challenges.challenges_id',
      'JOIN tags ',
      'ON tags_challenges.tags_id = tags.id',
      'WHERE challenges.org_id = ' + orgId,
      'AND tags.active = true',
      'AND challenges.active = true',
    ') as chal',
    'JOIN',
    'organisations',
    'ON',
    'organisations.id = ' + orgId,
    'AND organisations.active = true',
    'JOIN',
    'people',
    'ON',
    'organisations.id = people.org_id',
    'AND people.user_type = \'primary\'',
    'AND people.active = true',
    'JOIN',
    'tags_organisations',
    'ON',
    'organisations.id = tags_organisations.organisations_id',
    'JOIN',
    'tags',
    'ON',
    'tags_organisations.tags_id = tags.id',
    ';'
  // -- WHEN WE JOIN THE INNER AND THE OUTER, WE GET 'REPEATED' RESULTS
  // -- BUT THE QUERY DOES SEEM TO WORK AS EXPECTED
  ].join(' ');
}


/*
-- OUTER QUERY DEALS WITH ORGANISATION DETAILS, PRIMARY USER
-- ORGANISATION TAGS
SELECT
organisations.id as org_id,
organisations.name as org_name,
people.id as primary_id,
people.first_name as primary_first_name,
tags.name as org_tag_name,
tags.id as org_tag_id,
chal.chal_title as challenge_title,
chal.tag_name as challenge_tag_name,
chal.tag_id as challenge_tag_id
FROM (
-- SUB QUERY GETS ALL ACTIVE CHALLENGES RELATED TO GIVEN ORG
  SELECT
  challenges.title as chal_title,
  challenges.id as chal_id,
  tags.name as tag_name,
  tags.id as tag_id
  FROM challenges
  JOIN tags_challenges
  ON challenges.id = tags_challenges.challenges_id
  JOIN tags
  ON tags_challenges.tags_id = tags.id
  WHERE challenges.org_id = 1
  AND tags.active = true
  AND challenges.active = true

) as chal
JOIN
organisations
ON
organisations.id = 1
AND organisations.active = true
JOIN
people
ON
organisations.id = people.org_id
AND people.user_type = 'primary'
AND people.active = true
JOIN
tags_organisations
ON
organisations.id = tags_organisations.organisations_id
JOIN
tags
ON
tags_organisations.tags_id = tags.id
;
-- WHEN WE JOIN THE INNER AND THE OUTER, WE GET 'REPEATED' RESULTS
-- BUT THE QUERY DOES SEEM TO WORK AS EXPECTED

*/
