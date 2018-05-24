'use strict';

var test = require('tape');
var init = require('../../../example/server.js');
var config = require('../../../config/load-config.js');

function deleteOrg (id) {
  return {
    method: 'POST',
    url: '/deleteOrg?id=' + id
  };
}

test('Delete org', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      console.log('error initialise server', err);
      return t.fail();
    }
    server.inject(deleteOrg(7), function (res) {
      t.equal(res.statusCode, 200, 'Org deleted');
      t.equal(res.payload, '[]', 'return an empty array');
      t.end();
      pool.end()
      server.stop()
    });
  });
});

test('Fail to Delete org', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      console.log('error initialise server', err);
      return t.fail();
    }
    server.inject(deleteOrg(3), function (res) {
      t.equal(res.statusCode, 500, 'Org with users can not be deleted');
      t.end();
      pool.end()
      server.stop()
    });
  });
});
