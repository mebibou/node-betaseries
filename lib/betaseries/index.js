(function() {
  'use strict';

  var dotenv = require('dotenv');
  dotenv.load();

  var BetaSeries = function(apiKey) {
    var _this = this,
        _apiKey = apiKey;

    this.apiKey = function() {
      return _apiKey;
    };

    [
    'shows',
    'episodes'
    ]
      .forEach(function (path) {
          var modules = require('./' + path);
          for (var i in modules) {
            _this[i] = modules[i](_this);
          }
      });
  };

  module.exports = BetaSeries;

})();