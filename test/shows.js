var assert = require('chai').assert,
    BetaSeries = require('../index');

describe('#valid', function() {
  var betaSeries = new BetaSeries(process.env.BETASERIES_API_KEY);
  var shows = betaSeries.Shows;

  it('get info about a show', function(done) {
    var showId = 10;

    shows.get(showId, null, function(response) {
      assert(response.id == showId, 'show exists');
      assert(response.title == 'Prison Break', 'show is Prison Break');
      done();
    });
  });

  it('search shows', function(done) {
    shows.search('breaking', null, null, null, null, function(response) {
      assert(response.length > 1, 'found shows');
      done();
    });
  });

});