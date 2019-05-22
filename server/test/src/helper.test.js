const assert = require('assert');
const helpers = require('../../src/helper');

describe('Helper function', function() {
  const results = helpers.generateNumbers();
  const nonUnique = [results[0], results[0]];
  describe('generateNumbers', function() {
    it('should return an array', function(done) {
      assert.equal(typeof(results), 'object');
      done();
    });

    it('should generate 10 random phone numbers', function(done) {
        assert.equal(results.length, 10);
        done();
    });
  });

  describe('isUnique', function() {
    it('should generate unique random numbers', function(done) {
      assert.equal(helpers.isUnique(results), true);
      done();
    });
    it('should return true if no data is passed', function(done) {
      assert.equal(helpers.isUnique([]), true);
      done();
    });
    it('should return false if generated numbers is not unique', function(done) {
      assert.equal(helpers.isUnique(nonUnique), false);
      done();
    });
  })
});