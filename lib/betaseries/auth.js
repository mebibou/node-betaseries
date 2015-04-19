(function() {
  'use strict';

  var API = require('./api').API,
      _api = null,
      _baseUrl = 'https://api.betaseries.com/members/auth';

  function Auth() {

  }

  Auth.prototype.login = function(login, password, callbackSuccess, callbackError) {
  	_api.POST(_baseUrl, {login:login,password:password}, function(data) {
      if (callbackSuccess) {
        callbackSuccess(data);
      }
    }, callbackError);
  };

  exports.Auth = function(BetaSeries) {
    _api = new API(BetaSeries.apiKey);
    return new Auth();
  };

})();