'use strict';

var url = require('url');

var util = require('util');
var format = util.format;
var extend = util._extend;

var rsvp = require('rsvp');
var Promise = rsvp.Promise;
var denodeify = rsvp.denodeify;

var request = require('request');

module.exports = githubValidator;

////

var GITHUB_URL_OBJ = {
  protocol: 'https',
  host: 'github.com'
};

function githubValidator(name) {

  var urlObj = {};
  extend(urlObj, GITHUB_URL_OBJ);
  extend(urlObj, {pathname: name});
  var githubUri = url.format(urlObj);

  return Promise.resolve()
    .then(fetchGithub)
    .catch(function () {
      return Promise.reject(
        format('Expected "%s" url to be found', githubUri)
      );
    });

  function fetchGithub() {
    return denodeify(request)({
      uri: githubUri,
      headers: {
        'User-Agent': 'jspm/registry'
      }
    }).then(function (res) {
      return res.statusCode === 404 ? Promise.reject() : Promise.resolve();
    })
  }
}
