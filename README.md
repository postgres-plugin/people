# users
[![Build Status](https://travis-ci.org/postgres-plugin/people.svg?branch=master)](https://travis-ci.org/postgres-plugin/people)
[![codecov](https://codecov.io/gh/postgres-plugin/people/branch/master/graph/badge.svg)](https://codecov.io/gh/postgres-plugin/people)

## A simple users management system

This plugins, when registered on your Hapi application, will automatically create the tables "people", "organisations" and "tags_organisations" if they are not yet defined in your Postgres database.

# Plugin options

```
{
  reset: false,
  people: [],
  organisations: [],
  tags_orgs: []
}
```

When reset is defined to ```true``` the plugin will reset the tables with the content passed in the other options (people, organisation and tags_orgs).

So
- database unchanged: no options, or options are empty array
- datatbase reset: the options contain some data

# Exposed functions

- request.pg.people.getAllPeople - return a list of all the people

### request.server.pg.people.getBy(columnName, value, cb)
where either
columnName = 'email', value: string (an email address)
or
columnName = 'id', value: integer
returns an array of length 1 or 0:
```js
{
  id: 1,
  first_name: 'Bob',
  last_name: 'Bobby',
  user_type: 'admin',
  email: 'bob.bobby@bob.com',
  phone: '00000',
  password: '123pwd',
  job_title: 'Developer',
  last_login: '1479491066104',
  active: true,
  account_activated: true
}
```


### request.server.pg.organisations.getDetails(orgId, cb)
returns an object:
```js
{
  "org": {
    "id": 1,
    "name": "Apple",
    "logo_url": "https://apple.com",
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
      "tags": [
        {
          "tag_id": 2,
          "tag_name": "Corporate"
        }
      ]
    },
    ...
  ]
}
```

### request.server.pg.organisations.orgsGetByTag(activeOnly, filter, cb)
where
`activeOnly` is a Boolean value; Setting this to `false` will return _all_ (active
  and inactive) organisations. `true` will return _active_ orgs only.
`filter` corresponds to a tag ID. Organisations are filtered by this, and the
  query will return only return organisations associated with the tag ID
  specified.

returns an object of the following format:
```js
{
  filter: {
    id: 69,
    name: 'Design for disassembly'
  },
  orgs: {
    id: 1,
    name: 'Apple AAAA',
    logo_url: 'google.com/?search=appleaaaa',
    active: true
  }
}
```


### request.server.pg.organisations.toggleActive(orgId, cb)
if org id is a legitimate organisation id, we return an empty array
if org id is not recognised, we will return an Boom.notFound error.


### pg.organisations.edit(orgId, orgObj, cb)
Where
`id`: integer
`orgObj`: object containing at least one of the following keys: `['name', 'logo_url', 'mission_statement']`

if org id is a legitimate organisation id, we return an empty array
if org id is not recognised, we will return an Boom.notFound error.
