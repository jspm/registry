'use strict';

var format = require('util').format;
var spawn = require('child_process').spawn;

var rsvp = require('rsvp');
var Promise = rsvp.Promise;

////

module.exports = npmValidator;

////

var NPM_VALIDATION_CMD = 'npm info %s';

function npmValidator(name) {
  var command = format(NPM_VALIDATION_CMD, name);

  return new Promise(function (resolve, reject) {
    var child = spawn('sh', ['-c', command]);
    child.on('exit', function (err) {
      return err ? reject(err) : resolve();
    });
  })
    .catch(function () {
      return Promise.reject(
        format('Expected "%s" command to run without error', command)
      );
    });

}
