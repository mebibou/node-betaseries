var assert = require('chai').assert,
	crypto = require('crypto'),
    BetaSeries = require('../index');

describe('#valid', function() {
  var betaSeries = new BetaSeries(process.env.BETASERIES_API_KEY);
  var auth = betaSeries.Auth;

  it('login as user', function(done) {
    var user = {
      login: 'Dev080',
      password: crypto.createHash("md5").update('developer').digest("hex"),
      id: 27018	
    };

    auth.login(user.login, user.password, function(response) {
      assert(response.user.id == user.id, 'user connected');
      done();
    });
  });

});