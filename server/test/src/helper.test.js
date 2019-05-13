const assert = require('assert');
const helpers = require('../../src/helper');

describe('Helper function', function() {

  describe('generateNumbers', function() {
    const results = helpers.generateNumbers();
    it('should return an array', function() {
      assert.equal(typeof(results), 'object');
    });

    it('should generate 10 random phone numbers', function() {
        assert.equal(results.length, 10);
    });

    it('should generate unique random numbers', function() {
      console.log('results', results);
      assert.equal(helpers.isUnique(results), true);
    });

    // it('should ')
  });
});