(function() {
  'use strict';

  var BetaSeries = function(apiKey) {
    var _this = this,
        _apiKey = apiKey;

    this.apiKey = function() {
      return _apiKey;
    };

    [ 'shows']
      .forEach(function (path) {
          var modules = require('./' + path);
          for (var i in modules) {
            _this[i] = modules[i](_this);
          }
      });
  };

  module.exports = BetaSeries;

})();