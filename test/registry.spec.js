'use strict';

var format = require('util').format;
var Promise = require('rsvp').Promise;

var ENDPOINT_VALIDATORS = {
  github: require('./helper/github-validator'),
  npm: require('./helper/npm-validator')
};

var registry = require('../registry.json');

describe('Registry', function () {
  Object.keys(registry)
    .forEach(function (shortname) {
      var canonicalEndpointName = registry[shortname];

      describe(
        format('"%s" shortname for "%s"', shortname, canonicalEndpointName),
        function () {

          it('should link to an existing package', function (done) {
            Promise.resolve(canonicalEndpointName)
              .then(extractEndpoint)
              .then(validatePackage)
              // Done calls
              .then(done)
              .catch(function (e) { done(new Error(e)); })
            ;
          });

        });

    });
});

////

function extractEndpoint(canonicalEndpointName) {
  var match = canonicalEndpointName.split(':');
  return {
    endpoint: match[0],
    name: match[1]
  }
}

function validatePackage(packageData) {
  return ENDPOINT_VALIDATORS[packageData.endpoint](packageData.name)
}
