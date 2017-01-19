'use strict';

/* eslint-disable */

module.exports = function (orgId) {
  // '-- OUTER QUERY DEALS WITH ORGANISATION DETAILS, PRIMARY USER',
  // '-- ORGANISATION TAGS',
  // '-- SUB QUERY GETS ALL ACTIVE CHALLENGES RELATED TO GIVEN ORG',
  // '-- IF A CHALLENGE HAS NO TAGS, ITS TAGS.ACTIVE WILL BE NULL',
  // 'AND (tags.active IS NOT FALSE)',
  return [
    'SELECT',
    'organisations.id AS org_id, organisations.name AS org_name, organisations.logo_url AS org_logo_url, organisations.mission_statement AS org_mission_statement, organisations.active AS org_active,',
    'people.id AS primary_id, people.first_name AS primary_first_name, people.last_name AS primary_last_name, people.email AS primary_email, people.phone AS primary_phone, people.job_title AS primary_job_title,',
    'tags.name AS org_tag_name, tags.id AS org_tag_id,',
    'chal.chal_title AS challenge_title, chal.chal_description AS challenge_description, chal.tag_name AS challenge_tag_name, chal.tag_id AS challenge_tag_id, chal.chal_id AS challenge_id, chal.chal_date as challenge_date',
    'FROM (',
      'SELECT challenges.title AS chal_title, challenges.id AS chal_id, challenges.description AS chal_description, challenges.active AS chal_active, challenges.date as chal_date,',
      'tags.name AS tag_name, tags.id AS tag_id, tags.active AS tag_active',
      'FROM CHALLENGES',
      'LEFT OUTER JOIN tags_challenges ON challenges.id = tags_challenges.challenges_id',
      'LEFT OUTER JOIN tags ON tags_challenges.tags_id = tags.id',
      'WHERE challenges.org_id = ' + orgId,
      'AND (tags.active IS NOT FALSE)',
      'AND challenges.active = true',
    ') as chal',
    'FULL OUTER JOIN organisations ON TRUE',
    'LEFT OUTER JOIN people ON organisations.id = people.org_id AND people.user_type = \'primary\' AND people.active = true AND people.account_activated = true',
    'LEFT OUTER JOIN tags_organisations ON tags_organisations.organisations_id = ' + orgId,
    'LEFT OUTER JOIN tags ON tags_organisations.tags_id = tags.id',
    'WHERE organisations.id = ' + orgId,
    'ORDER BY chal_date DESC, challenge_tag_name',
    ';'
    // -- WHEN WE JOIN THE INNER AND THE OUTER, WE GET 'REPEATED' RESULTS
    // so some filtering will be necessary
  ].join(' ');
}



/*
Query useful for testing in the terminal.
  SELECT
  organisations.id AS org_id, organisations.name AS org_name, organisations.logo_url AS org_logo_url, organisations.mission_statement AS org_mission_statement, organisations.active AS org_active,
  people.id AS primary_id, people.first_name AS primary_first_name, people.last_name AS primary_last_name, people.email AS primary_email, people.phone AS primary_phone, people.job_title AS primary_job_title,
  tags.name AS org_tag_name, tags.id AS org_tag_id,
  chal.chal_title AS challenge_title, chal.chal_description AS challenge_description, chal.tag_name AS challenge_tag_name, chal.tag_id AS challenge_tag_id, chal.chal_id AS challenge_id, chal.chal_date as challenge_date
  FROM (
    SELECT challenges.title AS chal_title, challenges.id AS chal_id, challenges.description AS chal_description, challenges.active AS chal_active, challenges.date as chal_date,
    tags.name AS tag_name, tags.id AS tag_id, tags.active AS tag_active
    FROM CHALLENGES
    LEFT OUTER JOIN tags_challenges ON challenges.id = tags_challenges.challenges_id
    LEFT OUTER JOIN tags ON tags_challenges.tags_id = tags.id
    WHERE challenges.org_id = 1
    -- IF A CHALLENGE HAS NO TAGS, ITS TAGS.ACTIVE WILL BE NULL
    AND (tags.active IS NOT FALSE)
    AND challenges.active = true
  ) as chal
  FULL OUTER JOIN organisations ON TRUE
  LEFT OUTER JOIN people ON organisations.id = people.org_id AND people.user_type = 'primary' AND people.active = true AND people.account_activated = true
  LEFT OUTER JOIN tags_organisations ON tags_organisations.organisations_id = 1
  LEFT OUTER JOIN tags ON tags_organisations.tags_id = tags.id
  WHERE organisations.id = 1
  ORDER BY chal_date, challenge_tag_name
  ;


*/
