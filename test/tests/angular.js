var someHTML = require('./angular.html!text');

exports['load test'] = function(done) {
  System.import('angular').then(function() {
    done();
  });
}