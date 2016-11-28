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
