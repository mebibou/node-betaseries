(function() {
  'use strict';

  var API = require('./api').API,
      _api = null,
      _baseUrl = 'https://api.betaseries.com/members/auth';

  function Auth() {

  }

  Auth.prototype.login = function(login, password, callbackSuccess, callbackError) {
    var param = {
      login: login,
      password: password
    };
    _api.POST(_baseUrl, param, function(data) {
      if (callbackSuccess) {
        callbackSuccess(data);
      }
    }, callbackError);
  };

  exports.Auth = function(BetaSeries) {
    _api = new API(BetaSeries.apiKey());
    return new Auth();
  };

})();