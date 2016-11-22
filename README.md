# users
[![Build Status](https://travis-ci.org/postgres-plugin/people.svg?branch=master)](https://travis-ci.org/postgres-plugin/people)
[![codecov](https://codecov.io/gh/postgres-plugin/people/branch/master/graph/badge.svg)](https://codecov.io/gh/postgres-plugin/people)

A simple users management system

This plugins, when registered on your Hapi application will automatically create the tables "people", "organisations" and "tags_organisations" if they are not yet defined on your Postgres database.
If the options of the plugin define the properties "people", "organisations" or "tags_organisations" and if these properties are not empty (not an empty array) the tables will then be replace with the new content passed in the options. So the plugin won't reset the tables if no data are passed to the options, this can be useful when the server needs to restart without reseting the data (heroku reset, dependencies updates, new features added, ...), and in case the database needs to contains more data without adding them manually the options are then a good way to add in one go all the data.

- database unchanged: no options, or options are empty array
- datatbase reset: the options contain some data


- Contains a .sql file which initialises the 'users' and 'organisations' tables
- Has addUser, addOrganisation, getUser and getOrganisation functions
