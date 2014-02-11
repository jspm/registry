var someHTML = require('./angular.html!text');

exports['load test'] = function(done) {
  System.import('angular').then(function() {
    done();
  });
}

exports['another test'] = function(done) {
  System.import('angular').then(function(angular) {

    document.querySelector("#sandbox").innerHTML = someHTML;

    if (!angular)
      throw 'Test failed...';

    setTimeout(done, 1000);
  });
}

exports['last test'] = function(done) {
  done();
}