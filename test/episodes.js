var assert = require('chai').assert,
    BetaSeries = require('../index');

describe('#valid', function() {
  var betaSeries = new BetaSeries(process.env.BETASERIES_API_KEY);
  var episodes = betaSeries.Episodes;

  it('gets info about an episode', function(done) {
    var episodeId = 10;

    episodes.get(episodeId, null, null, function(response) {
      assert(response.id == episodeId, 'episode exists');
      assert(response.title == 'The World According to Garf', 'episode is The World According to Garf');
      assert(response.show.title == 'Big Day', 'show is Big Day');
      done();
    });
  });

  it('search episodes', function(done) {
    var showId = 10,
        episodeId = 1;

    episodes.search(showId, 1, null, function(response) {
      assert(response.id == 164037, 'episode exists');
      assert(response.show.id == showId, 'show exists');
      done();
    });
  });

});