'use strict';

/**
* create an sql query which creates triggers and associated procedures/functions
*/
var path = require('path');
var fs = require('fs');
var triggersFile = path.resolve(__dirname, '../fixtures/set-triggers.sql');
var setTriggers = fs.readFileSync(triggersFile, 'utf8').toString();

module.exports = function (options) {
  return options.reset ? setTriggers : '';
};
