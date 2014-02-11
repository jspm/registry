suite('Angular', function() {
  test('load', function(done) {
    System.import('angular').then(function() {
      done();
    });
  });
});