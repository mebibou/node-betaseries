(function() {
  'use strict';

  var request = require('request'),
      _apiKey = null;

  var API = function(apiKey) {
    _apiKey = apiKey;
  };

  function _request(url, params, method, callbackSuccess, callbackError) {
    callbackSuccess = callbackSuccess || false;
    callbackError = callbackError || false;

    var _url = url + '?v=2.3';

    request({
      url: _url,
      qs: params || {},
      headers: {
        'X-BetaSeries-Key': _apiKey
      },
      method: method || 'GET',
      json: true
    }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        if (callbackSuccess) {
          callbackSuccess(body);
        }
      }
      else if (callbackError) {
        callbackError(error, body);
      }
    });
  }

  API.prototype.GET = function(url, params, callbackSuccess, callbackError) {
    _request(url, params, 'GET', callbackSuccess, callbackError);
  };

  API.prototype.POST = function(url, params, callbackSuccess, callbackError) {
    _request(url, params, 'POST', callbackSuccess, callbackError);
  };

  API.prototype.PUT = function(url, params, callbackSuccess, callbackError) {
    _request(url, params, 'PUT', callbackSuccess, callbackError);
  };

  API.prototype.DELETE = function(url, params, callbackSuccess, callbackError) {
    _request(url, params, 'DELETE', callbackSuccess, callbackError);
  };

  exports.API = API;

})();