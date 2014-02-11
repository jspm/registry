
exports['load test'] = function(done) {
  System.import('angular').then(function() {
    done();
  });
}

exports['another test'] = function(done) {
  System.import('angular').then(function(angular) {
    if (!angular)
      throw 'Test failed...';
    done();
  });
}