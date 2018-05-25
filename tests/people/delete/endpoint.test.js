'use strict';

var test = require('tape');
var init = require('../../../example/server.js');
var config = require('../../../config/load-config.js');

function deleteUser (id) {
  return {
    method: 'POST',
    url: '/deleteUser?id=' + id
  };
}

test('Delete user', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      console.log('error initialise server', err);
      return t.fail();
    }
    server.inject(deleteUser(22), function (res) {
      t.equal(res.statusCode, 200, 'User deleted');
      t.equal(res.payload, '[]', 'return an empty array');
      t.end();
      pool.end()
      server.stop()
    });
  });
});

test('Fail to Delete user', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      console.log('error initialise server', err);
      return t.fail();
    }
    server.inject(deleteUser(3), function (res) {
      t.equal(res.statusCode, 500, 'User with challenges can not be deleted');
      t.end();
      pool.end()
      server.stop()
    });
  });
});
