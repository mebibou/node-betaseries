var assert = require('chai').assert,
    user = require('./credentials'),
    BetaSeries = require('../index');

describe('#valid', function() {
  var betaSeries = new BetaSeries(process.env.BETASERIES_API_KEY);
  var auth = betaSeries.Auth;

  it('login as user', function(done) {
    auth.login(user.getUsername(), user.getPassword(), function(response) {
      assert(response.token == user.getToken(), 'user connected');
      done();
    });
  });

});